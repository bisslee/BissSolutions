using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/partners")]
    [Authorize]
    public class PartnersController : ControllerBase
    {
        private readonly IPartnerService _partnerService;

        public PartnersController(IPartnerService partnerService)
        {
            _partnerService = partnerService;
        }

        /// <summary>
        /// Lista todos os parceiros (incluindo inativos para admin)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartners([FromQuery] bool includeInactive = true)
        {
            var partners = await _partnerService.GetAllPartnersAsync(includeInactive);
            return Ok(partners);
        }

        /// <summary>
        /// Obtém um parceiro por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Partner>> GetPartner(int id)
        {
            var partner = await _partnerService.GetPartnerByIdAsync(id);
            if (partner == null)
                return NotFound(new { message = "Parceiro não encontrado" });

            return Ok(partner);
        }

        /// <summary>
        /// Cria um novo parceiro
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Partner>> CreatePartner(Partner partner)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdPartner = await _partnerService.CreatePartnerAsync(partner);
                return CreatedAtAction(nameof(GetPartner), new { id = createdPartner.Id }, createdPartner);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao criar parceiro: {ex.Message}" });
            }
        }

        /// <summary>
        /// Atualiza um parceiro existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<Partner>> UpdatePartner(int id, Partner partner)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedPartner = await _partnerService.UpdatePartnerAsync(id, partner);
            if (updatedPartner == null)
                return NotFound(new { message = "Parceiro não encontrado" });

            return Ok(updatedPartner);
        }

        /// <summary>
        /// Deleta um parceiro (soft delete)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePartner(int id)
        {
            var result = await _partnerService.DeletePartnerAsync(id);
            if (!result)
                return NotFound(new { message = "Parceiro não encontrado" });

            return Ok(new { message = "Parceiro deletado com sucesso" });
        }

        /// <summary>
        /// Ativa/Desativa um parceiro
        /// </summary>
        [HttpPatch("{id}/toggle-active")]
        public async Task<ActionResult<Partner>> ToggleActive(int id)
        {
            var result = await _partnerService.ToggleActiveAsync(id);
            if (!result)
                return NotFound(new { message = "Parceiro não encontrado" });

            var partner = await _partnerService.GetPartnerByIdAsync(id);
            return Ok(partner);
        }
    }
}

