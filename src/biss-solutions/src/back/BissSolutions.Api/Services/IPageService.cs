using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public interface IPageService
    {
        Task<IEnumerable<Page>> GetAllPagesAsync();
        Task<Page?> GetPageByIdAsync(int id);
        Task<Page?> GetPageBySlugAsync(string slug);
        Task<Page> CreatePageAsync(Page page);
        Task<Page?> UpdatePageAsync(int id, Page page);
        Task<bool> DeletePageAsync(int id);
        Task<IEnumerable<Component>> GetPageComponentsAsync(int pageId);
        Task<Component> CreateComponentAsync(Component component);
        Task<bool> DeleteComponentAsync(int id);
    }
}
