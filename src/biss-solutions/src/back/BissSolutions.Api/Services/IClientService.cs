using System;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetAllClientsAsync(bool includeInactive = false);
        Task<Client?> GetClientByIdAsync(Guid id);
        Task<Client> CreateClientAsync(Client client);
        Task<Client?> UpdateClientAsync(Guid id, Client client);
        Task<bool> DeleteClientAsync(Guid id); // Soft delete
        Task<bool> ToggleActiveAsync(Guid id); // Ativar/Desativar
    }
}

