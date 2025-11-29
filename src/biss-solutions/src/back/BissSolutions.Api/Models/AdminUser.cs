using Microsoft.AspNetCore.Identity;

namespace BissSolutions.Api.Models
{
    public class AdminUser : IdentityUser
    {
        public string? FullName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;
    }
}

