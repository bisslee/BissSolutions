using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetAllClientsAsync(bool includeInactive = false);
        Task<Client?> GetClientByIdAsync(int id);
        Task<Client> CreateClientAsync(Client client);
        Task<Client?> UpdateClientAsync(int id, Client client);
        Task<bool> DeleteClientAsync(int id); // Soft delete
        Task<bool> ToggleActiveAsync(int id); // Ativar/Desativar
    }
}

