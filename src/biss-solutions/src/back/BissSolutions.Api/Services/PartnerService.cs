using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Data;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public class PartnerService : IPartnerService
    {
        private readonly ApplicationDbContext _context;

        public PartnerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Partner>> GetAllPartnersAsync(bool includeInactive = false)
        {
            var query = _context.Partners.AsQueryable();

            if (!includeInactive)
            {
                query = query.Where(p => p.IsActive);
            }

            return await query
                .OrderBy(p => p.Order)
                .ThenBy(p => p.Name)
                .ToListAsync();
        }

        public async Task<Partner?> GetPartnerByIdAsync(int id)
        {
            return await _context.Partners.FindAsync(id);
        }

        public async Task<Partner> CreatePartnerAsync(Partner partner)
        {
            partner.CreatedAt = DateTime.UtcNow;
            partner.UpdatedAt = DateTime.UtcNow;

            _context.Partners.Add(partner);
            await _context.SaveChangesAsync();
            return partner;
        }

        public async Task<Partner?> UpdatePartnerAsync(int id, Partner partner)
        {
            var existingPartner = await _context.Partners.FindAsync(id);
            if (existingPartner == null) return null;

            existingPartner.Name = partner.Name;
            existingPartner.Logo = partner.Logo;
            existingPartner.Description = partner.Description;
            existingPartner.Website = partner.Website;
            existingPartner.IsActive = partner.IsActive;
            existingPartner.Order = partner.Order;
            existingPartner.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingPartner;
        }

        public async Task<bool> DeletePartnerAsync(int id)
        {
            var partner = await _context.Partners.FindAsync(id);
            if (partner == null) return false;

            // Soft delete
            partner.IsActive = false;
            partner.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleActiveAsync(int id)
        {
            var partner = await _context.Partners.FindAsync(id);
            if (partner == null) return false;

            partner.IsActive = !partner.IsActive;
            partner.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

