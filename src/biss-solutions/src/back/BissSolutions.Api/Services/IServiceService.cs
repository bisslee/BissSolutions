using BissSolutions.Api.Models;
using BissSolutions.Api.Models.Enums;

namespace BissSolutions.Api.Services
{
    public interface IServiceService
    {
        Task<IEnumerable<Service>> GetAllServicesAsync(bool includeInactive = false);
        Task<Service?> GetServiceByIdAsync(int id);
        Task<Service?> GetServiceBySlugAsync(string slug);
        Task<Service> CreateServiceAsync(Service service);
        Task<Service?> UpdateServiceAsync(int id, Service service);
        Task<bool> DeleteServiceAsync(int id);
        Task<bool> ToggleActiveAsync(int id);
        Task<int> GetCountAsync(ServiceStatusFilter statusFilter = ServiceStatusFilter.All);
    }
}

