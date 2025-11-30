using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/clients")]
    [Authorize]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientsController(IClientService clientService)
        {
            _clientService = clientService;
        }

        /// <summary>
        /// Lista todos os clientes (incluindo inativos para admin)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients([FromQuery] bool includeInactive = true)
        {
            var clients = await _clientService.GetAllClientsAsync(includeInactive);
            return Ok(clients);
        }

        /// <summary>
        /// Obtém um cliente por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _clientService.GetClientByIdAsync(id);
            if (client == null)
                return NotFound(new { message = "Cliente não encontrado" });

            return Ok(client);
        }

        /// <summary>
        /// Cria um novo cliente
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Client>> CreateClient(Client client)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdClient = await _clientService.CreateClientAsync(client);
                return CreatedAtAction(nameof(GetClient), new { id = createdClient.Id }, createdClient);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao criar cliente: {ex.Message}" });
            }
        }

        /// <summary>
        /// Atualiza um cliente existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<Client>> UpdateClient(int id, Client client)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedClient = await _clientService.UpdateClientAsync(id, client);
            if (updatedClient == null)
                return NotFound(new { message = "Cliente não encontrado" });

            return Ok(updatedClient);
        }

        /// <summary>
        /// Deleta um cliente (soft delete)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var result = await _clientService.DeleteClientAsync(id);
            if (!result)
                return NotFound(new { message = "Cliente não encontrado" });

            return Ok(new { message = "Cliente deletado com sucesso" });
        }

        /// <summary>
        /// Ativa/Desativa um cliente
        /// </summary>
        [HttpPatch("{id}/toggle-active")]
        public async Task<ActionResult<Client>> ToggleActive(int id)
        {
            var result = await _clientService.ToggleActiveAsync(id);
            if (!result)
                return NotFound(new { message = "Cliente não encontrado" });

            var client = await _clientService.GetClientByIdAsync(id);
            return Ok(client);
        }
    }
}

