using System.Net;
using System.Net.Mail;

namespace BissSolutions.Api.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendContactEmailAsync(string fromEmail, string fromName, string subject, string message, string? phone = null, string? company = null)
        {
            try
            {
                var smtpHost = _configuration["EmailSettings:SmtpServer"] ?? "mail.biss.com.br";
                var smtpPort = _configuration.GetValue<int>("EmailSettings:SmtpPort", 587);
                var enableSsl = _configuration.GetValue<bool>("EmailSettings:EnableSsl", true);
                var smtpUser = _configuration["EmailSettings:SmtpUsername"];
                var smtpPassword = _configuration["EmailSettings:SmtpPassword"];
                var toEmail = _configuration["EmailSettings:ToEmail"] ?? "ivana@biss.com.br";
                var fromAddress = _configuration["EmailSettings:FromEmail"] ?? smtpUser;

                if (string.IsNullOrEmpty(smtpUser) || string.IsNullOrEmpty(smtpPassword))
                {
                    _logger.LogWarning("Email settings not configured. Email will not be sent.");
                    return false;
                }

                using (var mailMessage = new MailMessage())
                {
                    mailMessage.From = new MailAddress(fromAddress, "Biss Solutions - Site");
                    mailMessage.To.Add(new MailAddress(toEmail, "Ivana Batista"));
                    mailMessage.Subject = $"Contato do Site: {subject}";
                    
                    // Sanitizar entrada para prevenir XSS
                    var sanitizedName = System.Net.WebUtility.HtmlEncode(fromName);
                    var sanitizedEmail = System.Net.WebUtility.HtmlEncode(fromEmail);
                    var sanitizedPhone = !string.IsNullOrEmpty(phone) ? System.Net.WebUtility.HtmlEncode(phone) : "";
                    var sanitizedCompany = !string.IsNullOrEmpty(company) ? System.Net.WebUtility.HtmlEncode(company) : "";
                    var sanitizedSubject = System.Net.WebUtility.HtmlEncode(subject);
                    var sanitizedMessage = System.Net.WebUtility.HtmlEncode(message).Replace("\n", "<br>");
                    
                    var body = $@"
<html>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
        <h2 style='color: #2c3850; border-bottom: 2px solid #2c3850; padding-bottom: 10px;'>
            Nova Mensagem de Contato
        </h2>
        
        <div style='background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;'>
            <p><strong>Nome:</strong> {sanitizedName}</p>
            <p><strong>E-mail:</strong> {sanitizedEmail}</p>
            {(!string.IsNullOrEmpty(sanitizedPhone) ? $"<p><strong>Telefone:</strong> {sanitizedPhone}</p>" : "")}
            {(!string.IsNullOrEmpty(sanitizedCompany) ? $"<p><strong>Empresa:</strong> {sanitizedCompany}</p>" : "")}
            <p><strong>Assunto:</strong> {sanitizedSubject}</p>
        </div>
        
        <div style='margin: 20px 0;'>
            <h3 style='color: #2c3850;'>Mensagem:</h3>
            <div style='background-color: #ffffff; padding: 15px; border-left: 4px solid #2c3850; border-radius: 3px;'>
                <p style='white-space: pre-wrap;'>{sanitizedMessage}</p>
            </div>
        </div>
        
        <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;'>
            <p>Esta mensagem foi enviada através do formulário de contato do site biss.com.br</p>
            <p>Data/Hora: {DateTime.Now:dd/MM/yyyy HH:mm:ss}</p>
        </div>
    </div>
</body>
</html>";

                    mailMessage.Body = body;
                    mailMessage.IsBodyHtml = true;

                    using (var smtpClient = new SmtpClient(smtpHost, smtpPort))
                    {
                        smtpClient.EnableSsl = enableSsl;
                        smtpClient.Credentials = new NetworkCredential(smtpUser, smtpPassword);
                        smtpClient.Timeout = 30000; // 30 segundos
                        
                        await smtpClient.SendMailAsync(mailMessage);
                        
                        _logger.LogInformation($"Email sent successfully to {toEmail} from {fromEmail}");
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending email");
                return false;
            }
        }
    }
}

