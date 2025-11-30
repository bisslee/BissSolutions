using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        /// <summary>
        /// Obtém as informações públicas da empresa
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<BissSolutions.Api.Models.Company>> GetCompany()
        {
            var company = await _companyService.GetCompanyAsync();
            if (company == null || !company.IsActive)
                return NotFound();

            return Ok(company);
        }
    }
}

