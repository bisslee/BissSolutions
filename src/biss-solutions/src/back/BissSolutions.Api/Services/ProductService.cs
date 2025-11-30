using System;
using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Data;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync(bool includeInactive = false)
        {
            var query = _context.Products.AsQueryable();

            if (!includeInactive)
            {
                query = query.Where(p => p.IsActive);
            }

            return await query
                .OrderBy(p => p.Order)
                .ThenBy(p => p.Title)
                .ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(Guid id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category, bool includeInactive = false)
        {
            var query = _context.Products
                .Where(p => p.Category == category)
                .AsQueryable();

            if (!includeInactive)
            {
                query = query.Where(p => p.IsActive);
            }

            return await query
                .OrderBy(p => p.Order)
                .ThenBy(p => p.Title)
                .ToListAsync();
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            product.CreatedAt = DateTime.UtcNow;
            product.UpdatedAt = DateTime.UtcNow;

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product?> UpdateProductAsync(Guid id, Product product)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null) return null;

            existingProduct.Title = product.Title;
            existingProduct.Description = product.Description;
            existingProduct.CurrentVersion = product.CurrentVersion;
            existingProduct.TechnologyItems = product.TechnologyItems;
            existingProduct.Features = product.Features;
            existingProduct.NugetLink = product.NugetLink;
            existingProduct.DocumentationLink = product.DocumentationLink;
            existingProduct.GithubLink = product.GithubLink;
            existingProduct.ProductLink = product.ProductLink;
            existingProduct.Image = product.Image;
            existingProduct.Price = product.Price;
            existingProduct.Category = product.Category;
            existingProduct.IsActive = product.IsActive;
            existingProduct.Order = product.Order;
            existingProduct.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingProduct;
        }

        public async Task<bool> DeleteProductAsync(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            // Soft delete
            product.IsActive = false;
            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleActiveAsync(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            product.IsActive = !product.IsActive;
            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

