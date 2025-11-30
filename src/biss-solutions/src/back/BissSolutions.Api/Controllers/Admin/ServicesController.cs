using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Models;
using BissSolutions.Api.Models.Enums;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/services")]
    [Authorize]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        /// <summary>
        /// Obtém o total de serviços com filtro opcional
        /// </summary>
        [HttpGet("count")]
        public async Task<ActionResult<object>> GetServicesCount([FromQuery] ServiceStatusFilter statusFilter = ServiceStatusFilter.All)
        {
            var count = await _serviceService.GetCountAsync(statusFilter);
            return Ok(new { count, statusFilter = statusFilter.ToString() });
        }

        /// <summary>
        /// Lista todos os serviços (incluindo inativos para admin)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetServices([FromQuery] bool includeInactive = true)
        {
            var services = await _serviceService.GetAllServicesAsync(includeInactive);
            return Ok(services);
        }

        /// <summary>
        /// Obtém um serviço por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetService(int id)
        {
            var service = await _serviceService.GetServiceByIdAsync(id);
            if (service == null)
                return NotFound(new { message = "Serviço não encontrado" });

            return Ok(service);
        }

        /// <summary>
        /// Cria um novo serviço
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Service>> CreateService(Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdService = await _serviceService.CreateServiceAsync(service);
                return CreatedAtAction(nameof(GetService), new { id = createdService.Id }, createdService);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao criar serviço: {ex.Message}" });
            }
        }

        /// <summary>
        /// Atualiza um serviço existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<Service>> UpdateService(int id, Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedService = await _serviceService.UpdateServiceAsync(id, service);
            if (updatedService == null)
                return NotFound(new { message = "Serviço não encontrado" });

            return Ok(updatedService);
        }

        /// <summary>
        /// Deleta um serviço (soft delete)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var result = await _serviceService.DeleteServiceAsync(id);
            if (!result)
                return NotFound(new { message = "Serviço não encontrado" });

            return Ok(new { message = "Serviço deletado com sucesso" });
        }

        /// <summary>
        /// Ativa/Desativa um serviço
        /// </summary>
        [HttpPatch("{id}/toggle-active")]
        public async Task<ActionResult<Service>> ToggleActive(int id)
        {
            var result = await _serviceService.ToggleActiveAsync(id);
            if (!result)
                return NotFound(new { message = "Serviço não encontrado" });

            var service = await _serviceService.GetServiceByIdAsync(id);
            return Ok(service);
        }
    }
}

