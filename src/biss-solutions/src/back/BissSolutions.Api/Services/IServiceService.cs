using System;
using BissSolutions.Api.Models;
using BissSolutions.Api.Models.Enums;

namespace BissSolutions.Api.Services
{
    public interface IServiceService
    {
        Task<IEnumerable<Service>> GetAllServicesAsync(bool includeInactive = false);
        Task<Service?> GetServiceByIdAsync(Guid id);
        Task<Service?> GetServiceBySlugAsync(string slug);
        Task<Service> CreateServiceAsync(Service service);
        Task<Service?> UpdateServiceAsync(Guid id, Service service);
        Task<bool> DeleteServiceAsync(Guid id);
        Task<bool> ToggleActiveAsync(Guid id);
        Task<int> GetCountAsync(ServiceStatusFilter statusFilter = ServiceStatusFilter.All);
    }
}

