using System;
using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartnersController : ControllerBase
    {
        private readonly IPartnerService _partnerService;

        public PartnersController(IPartnerService partnerService)
        {
            _partnerService = partnerService;
        }

        /// <summary>
        /// Obtém todos os parceiros ativos para o site público
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetActivePartners()
        {
            var partners = await _partnerService.GetAllPartnersAsync(includeInactive: false);
            return Ok(partners);
        }

        /// <summary>
        /// Obtém um parceiro ativo por ID para o site público
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Partner>> GetPartner(Guid id)
        {
            var partner = await _partnerService.GetPartnerByIdAsync(id);
            if (partner == null || !partner.IsActive)
                return NotFound();
            return Ok(partner);
        }
    }
}

