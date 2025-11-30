using System;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public interface IPartnerService
    {
        Task<IEnumerable<Partner>> GetAllPartnersAsync(bool includeInactive = false);
        Task<Partner?> GetPartnerByIdAsync(Guid id);
        Task<Partner> CreatePartnerAsync(Partner partner);
        Task<Partner?> UpdatePartnerAsync(Guid id, Partner partner);
        Task<bool> DeletePartnerAsync(Guid id); // Soft delete
        Task<bool> ToggleActiveAsync(Guid id); // Ativar/Desativar
    }
}

