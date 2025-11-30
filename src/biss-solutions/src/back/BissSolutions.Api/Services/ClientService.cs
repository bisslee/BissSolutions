using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Data;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public class ClientService : IClientService
    {
        private readonly ApplicationDbContext _context;

        public ClientService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Client>> GetAllClientsAsync(bool includeInactive = false)
        {
            var query = _context.Clients.AsQueryable();

            if (!includeInactive)
            {
                query = query.Where(c => c.IsActive);
            }

            return await query
                .OrderBy(c => c.Order)
                .ThenBy(c => c.Name)
                .ToListAsync();
        }

        public async Task<Client?> GetClientByIdAsync(int id)
        {
            return await _context.Clients.FindAsync(id);
        }

        public async Task<Client> CreateClientAsync(Client client)
        {
            client.CreatedAt = DateTime.UtcNow;
            client.UpdatedAt = DateTime.UtcNow;

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return client;
        }

        public async Task<Client?> UpdateClientAsync(int id, Client client)
        {
            var existingClient = await _context.Clients.FindAsync(id);
            if (existingClient == null) return null;

            existingClient.Name = client.Name;
            existingClient.Versions = client.Versions;
            existingClient.Description = client.Description;
            existingClient.ServicesProvided = client.ServicesProvided;
            existingClient.Logo = client.Logo;
            existingClient.ProjectImage = client.ProjectImage;
            existingClient.ProjectLink = client.ProjectLink;
            existingClient.Website = client.Website;
            existingClient.IsActive = client.IsActive;
            existingClient.Order = client.Order;
            existingClient.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingClient;
        }

        public async Task<bool> DeleteClientAsync(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null) return false;

            // Soft delete
            client.IsActive = false;
            client.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleActiveAsync(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null) return false;

            client.IsActive = !client.IsActive;
            client.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

