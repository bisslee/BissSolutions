using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Data;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public class PageService : IPageService
    {
        private readonly ApplicationDbContext _context;

        public PageService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Page>> GetAllPagesAsync()
        {
            return await _context.Pages
                .Include(p => p.Components.Where(c => c.IsActive))
                .ThenInclude(c => c.Images)
                .Include(p => p.Images)
                .Where(p => p.IsActive)
                .OrderBy(p => p.Order)
                .ToListAsync();
        }

        public async Task<Page?> GetPageByIdAsync(int id)
        {
            return await _context.Pages
                .Include(p => p.Components.Where(c => c.IsActive))
                .ThenInclude(c => c.Images)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        }

        public async Task<Page?> GetPageBySlugAsync(string slug)
        {
            return await _context.Pages
                .Include(p => p.Components.Where(c => c.IsActive))
                .ThenInclude(c => c.Images)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Slug == slug && p.IsActive);
        }

        public async Task<Page> CreatePageAsync(Page page)
        {
            page.CreatedAt = DateTime.UtcNow;
            page.UpdatedAt = DateTime.UtcNow;
            
            _context.Pages.Add(page);
            await _context.SaveChangesAsync();
            return page;
        }

        public async Task<Page?> UpdatePageAsync(int id, Page page)
        {
            var existingPage = await _context.Pages.FindAsync(id);
            if (existingPage == null) return null;

            existingPage.Title = page.Title;
            existingPage.Slug = page.Slug;
            existingPage.Description = page.Description;
            existingPage.MetaTitle = page.MetaTitle;
            existingPage.MetaDescription = page.MetaDescription;
            existingPage.IsActive = page.IsActive;
            existingPage.Order = page.Order;
            existingPage.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingPage;
        }

        public async Task<bool> DeletePageAsync(int id)
        {
            var page = await _context.Pages.FindAsync(id);
            if (page == null) return false;

            page.IsActive = false;
            page.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Component>> GetPageComponentsAsync(int pageId)
        {
            return await _context.Components
                .Include(c => c.Images)
                .Where(c => c.PageId == pageId && c.IsActive)
                .OrderBy(c => c.Order)
                .ToListAsync();
        }

        public async Task<Component> CreateComponentAsync(Component component)
        {
            _context.Components.Add(component);
            await _context.SaveChangesAsync();
            return component;
        }

        public async Task<bool> DeleteComponentAsync(int id)
        {
            var component = await _context.Components.FindAsync(id);
            if (component == null) return false;

            component.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
