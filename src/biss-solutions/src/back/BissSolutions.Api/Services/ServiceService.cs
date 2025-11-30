using System;
using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Data;
using BissSolutions.Api.Models;
using BissSolutions.Api.Models.Enums;
using System.Text.RegularExpressions;

namespace BissSolutions.Api.Services
{
    public class ServiceService : IServiceService
    {
        private readonly ApplicationDbContext _context;

        public ServiceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Service>> GetAllServicesAsync(bool includeInactive = false)
        {
            var query = _context.Services.AsQueryable();

            if (!includeInactive)
            {
                query = query.Where(s => s.IsActive);
            }

            return await query
                .OrderBy(s => s.Order)
                .ThenBy(s => s.Title)
                .ToListAsync();
        }

        public async Task<Service?> GetServiceByIdAsync(Guid id)
        {
            return await _context.Services.FindAsync(id);
        }

        public async Task<Service?> GetServiceBySlugAsync(string slug)
        {
            return await _context.Services
                .FirstOrDefaultAsync(s => s.Slug == slug && s.IsActive);
        }

        public async Task<Service> CreateServiceAsync(Service service)
        {
            // Gerar slug se não fornecido
            if (string.IsNullOrWhiteSpace(service.Slug))
            {
                service.Slug = GenerateSlug(service.Title);
            }
            else
            {
                service.Slug = GenerateSlug(service.Slug);
            }

            // Verificar se o slug já existe
            var existingSlug = await _context.Services
                .FirstOrDefaultAsync(s => s.Slug == service.Slug);
            
            if (existingSlug != null)
            {
                service.Slug = $"{service.Slug}-{DateTime.UtcNow.Ticks}";
            }

            service.CreatedAt = DateTime.UtcNow;
            service.UpdatedAt = DateTime.UtcNow;

            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return service;
        }

        public async Task<Service?> UpdateServiceAsync(Guid id, Service service)
        {
            var existingService = await _context.Services.FindAsync(id);
            if (existingService == null) return null;

            // Atualizar slug se necessário
            if (!string.IsNullOrWhiteSpace(service.Slug) && service.Slug != existingService.Slug)
            {
                var slug = GenerateSlug(service.Slug);
                
                // Verificar se o novo slug já existe
                var existingSlug = await _context.Services
                    .FirstOrDefaultAsync(s => s.Slug == slug && s.Id != id);
                
                if (existingSlug != null)
                {
                    slug = $"{slug}-{DateTime.UtcNow.Ticks}";
                }
                
                existingService.Slug = slug;
            }

            existingService.Title = service.Title;
            existingService.Description = service.Description;
            existingService.ServiceTypes = service.ServiceTypes;
            existingService.Image = service.Image;
            existingService.IsNew = service.IsNew;
            existingService.FeaturedOnHome = service.FeaturedOnHome;
            existingService.IsActive = service.IsActive;
            existingService.Order = service.Order;
            existingService.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingService;
        }

        public async Task<bool> DeleteServiceAsync(Guid id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            // Soft delete
            service.IsActive = false;
            service.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleActiveAsync(Guid id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            service.IsActive = !service.IsActive;
            service.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        private static string GenerateSlug(string text)
        {
            // Remover acentos
            text = RemoveAccents(text);
            
            // Converter para minúsculas
            text = text.ToLowerInvariant();
            
            // Remover caracteres especiais e espaços
            text = Regex.Replace(text, @"[^a-z0-9\s-]", "");
            
            // Substituir espaços e múltiplos hífens por um único hífen
            text = Regex.Replace(text, @"[\s-]+", "-");
            
            // Remover hífens no início e fim
            text = text.Trim('-');
            
            return text;
        }

        public async Task<int> GetCountAsync(ServiceStatusFilter statusFilter = ServiceStatusFilter.All)
        {
            var query = _context.Services.AsQueryable();

            switch (statusFilter)
            {
                case ServiceStatusFilter.Active:
                    query = query.Where(s => s.IsActive);
                    break;
                case ServiceStatusFilter.Inactive:
                    query = query.Where(s => !s.IsActive);
                    break;
                case ServiceStatusFilter.All:
                default:
                    // Não filtra, conta todos
                    break;
            }

            return await query.CountAsync();
        }

        private static string RemoveAccents(string text)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(text);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }
    }
}

