using System;
using Microsoft.EntityFrameworkCore;
using BissSolutions.Api.Data;
using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ApplicationDbContext _context;

        public CompanyService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Company?> GetCompanyAsync()
        {
            // Como Company é singular, sempre retornar o primeiro registro ativo
            // ou criar um padrão se não existir
            var company = await _context.Companies
                .FirstOrDefaultAsync(c => c.IsActive);

            if (company == null)
            {
                // Se não existe nenhuma empresa ativa, buscar qualquer uma (incluindo inativas)
                company = await _context.Companies.FirstOrDefaultAsync();
            }

            return company;
        }

        public async Task<Company?> UpdateCompanyAsync(Company company)
        {
            var existingCompany = await _context.Companies.FirstOrDefaultAsync();
            
            if (existingCompany == null)
            {
                // Se não existe, criar uma nova
                company.CreatedAt = DateTime.UtcNow;
                company.UpdatedAt = DateTime.UtcNow;
                _context.Companies.Add(company);
            }
            else
            {
                // Atualizar a existente
                existingCompany.Name = company.Name;
                existingCompany.LegalName = company.LegalName;
                existingCompany.CNPJ = company.CNPJ;
                existingCompany.Email = company.Email;
                existingCompany.Phone = company.Phone;
                existingCompany.Website = company.Website;
                existingCompany.Address = company.Address;
                existingCompany.City = company.City;
                existingCompany.State = company.State;
                existingCompany.ZipCode = company.ZipCode;
                existingCompany.LinkedInUrl = company.LinkedInUrl;
                existingCompany.FacebookUrl = company.FacebookUrl;
                existingCompany.InstagramUrl = company.InstagramUrl;
                existingCompany.TwitterUrl = company.TwitterUrl;
                existingCompany.YouTubeUrl = company.YouTubeUrl;
                existingCompany.LogoUrl = company.LogoUrl;
                existingCompany.BannerUrl = company.BannerUrl;
                existingCompany.Description = company.Description;
                existingCompany.Mission = company.Mission;
                existingCompany.Vision = company.Vision;
                existingCompany.Values = company.Values;
                existingCompany.History = company.History;
                existingCompany.FoundedYear = company.FoundedYear;
                existingCompany.NumberOfEmployees = company.NumberOfEmployees;
                existingCompany.IsActive = company.IsActive;
                existingCompany.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return existingCompany ?? company;
        }
    }
}

