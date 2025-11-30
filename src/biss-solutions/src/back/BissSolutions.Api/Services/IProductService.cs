using System;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync(bool includeInactive = false);
        Task<Product?> GetProductByIdAsync(Guid id);
        Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category, bool includeInactive = false);
        Task<Product> CreateProductAsync(Product product);
        Task<Product?> UpdateProductAsync(Guid id, Product product);
        Task<bool> DeleteProductAsync(Guid id);
        Task<bool> ToggleActiveAsync(Guid id);
    }
}

