using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/company")]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        /// <summary>
        /// Obtém as informações da empresa
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<Company>> GetCompany()
        {
            var company = await _companyService.GetCompanyAsync();
            if (company == null)
            {
                // Retornar objeto vazio ao invés de NotFound para permitir criação via PUT
                return Ok(new Company());
            }

            return Ok(company);
        }

        /// <summary>
        /// Atualiza as informações da empresa (ou cria se não existir)
        /// </summary>
        [HttpPut]
        public async Task<ActionResult<Company>> UpdateCompany(Company company)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedCompany = await _companyService.UpdateCompanyAsync(company);
                return Ok(updatedCompany);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao atualizar informações da empresa: {ex.Message}" });
            }
        }
    }
}

