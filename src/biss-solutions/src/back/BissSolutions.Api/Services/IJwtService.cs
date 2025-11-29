using BissSolutions.Api.Models;
using System.Security.Claims;

namespace BissSolutions.Api.Services
{
    public interface IJwtService
    {
        string GenerateToken(AdminUser user, IEnumerable<string> roles);
        ClaimsPrincipal? ValidateToken(string token);
        string GenerateRefreshToken();
    }
}

