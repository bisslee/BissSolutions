using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Data;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ContactController> _logger;

        public ContactController(
            IEmailService emailService, 
            ApplicationDbContext context,
            ILogger<ContactController> logger)
        {
            _emailService = emailService;
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Envia uma mensagem de contato
        /// </summary>
        [HttpPost]
        public async Task<ActionResult> CreateContact(Contact contact)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { 
                    success = false, 
                    message = "Dados inválidos. Por favor, verifique os campos obrigatórios." 
                });

            try
            {
                // Salvar no banco de dados
                contact.CreatedAt = DateTime.UtcNow;
                contact.IsRead = false;

                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Contact saved to database with ID: {contact.Id}");

                // Enviar email (não bloqueia se falhar)
                try
                {
                    var emailSent = await _emailService.SendContactEmailAsync(
                        contact.Email,
                        contact.Name,
                        contact.Subject,
                        contact.Message,
                        contact.Phone,
                        contact.Company
                    );

                    if (emailSent)
                    {
                        _logger.LogInformation($"Email sent successfully for contact ID: {contact.Id}");
                    }
                    else
                    {
                        _logger.LogWarning($"Failed to send email for contact ID: {contact.Id}");
                    }
                }
                catch (Exception emailEx)
                {
                    // Log do erro de email mas não falha a requisição
                    _logger.LogError(emailEx, $"Error sending email for contact ID: {contact.Id}");
                }

                return Ok(new { 
                    success = true, 
                    message = "Mensagem enviada com sucesso! Entraremos em contato em breve." 
                });
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, $"Database error while saving contact from {contact.Email}");
                return StatusCode(500, new { 
                    success = false, 
                    message = "Erro ao salvar mensagem. Por favor, tente novamente." 
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing contact form from {contact.Email}");
                return StatusCode(500, new { 
                    success = false, 
                    message = "Erro ao processar sua mensagem. Por favor, tente novamente." 
                });
            }
        }

    }
}
