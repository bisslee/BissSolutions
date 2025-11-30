using System;
using System.ComponentModel.DataAnnotations;

namespace BissSolutions.Api.Models
{
    public class Partner
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Logo { get; set; }
        
        [MaxLength(2000)]
        public string? Description { get; set; }
        
        [MaxLength(500)]
        public string? Website { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public int Order { get; set; } = 0;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
