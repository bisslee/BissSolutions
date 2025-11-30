using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        /// <summary>
        /// Lista todos os serviços ativos (público)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BissSolutions.Api.Models.Service>>> GetServices()
        {
            var services = await _serviceService.GetAllServicesAsync(includeInactive: false);
            return Ok(services);
        }

        /// <summary>
        /// Obtém um serviço por slug (público)
        /// </summary>
        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<BissSolutions.Api.Models.Service>> GetServiceBySlug(string slug)
        {
            var service = await _serviceService.GetServiceBySlugAsync(slug);
            if (service == null)
                return NotFound();

            return Ok(service);
        }
    }
}

