using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public interface IPartnerService
    {
        Task<IEnumerable<Partner>> GetAllPartnersAsync(bool includeInactive = false);
        Task<Partner?> GetPartnerByIdAsync(int id);
        Task<Partner> CreatePartnerAsync(Partner partner);
        Task<Partner?> UpdatePartnerAsync(int id, Partner partner);
        Task<bool> DeletePartnerAsync(int id); // Soft delete
        Task<bool> ToggleActiveAsync(int id); // Ativar/Desativar
    }
}

