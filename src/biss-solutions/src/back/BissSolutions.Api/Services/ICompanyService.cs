using BissSolutions.Api.Models;

namespace BissSolutions.Api.Services
{
    public interface ICompanyService
    {
        Task<Company?> GetCompanyAsync();
        Task<Company?> UpdateCompanyAsync(Company company);
    }
}

