using System;
using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientsController(IClientService clientService)
        {
            _clientService = clientService;
        }

        /// <summary>
        /// Obtém todos os clientes ativos para o site público
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetActiveClients()
        {
            var clients = await _clientService.GetAllClientsAsync(includeInactive: false);
            return Ok(clients);
        }

        /// <summary>
        /// Obtém um cliente ativo por ID para o site público
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(Guid id)
        {
            var client = await _clientService.GetClientByIdAsync(id);
            if (client == null || !client.IsActive)
                return NotFound();
            return Ok(client);
        }
    }
}

