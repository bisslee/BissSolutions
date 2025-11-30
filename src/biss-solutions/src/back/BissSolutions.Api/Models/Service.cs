using System;
using System.ComponentModel.DataAnnotations;

namespace BissSolutions.Api.Models
{
    public class Service
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(2000)]
        public string? Description { get; set; }
        
        [MaxLength(5000)]
        public string? ServiceTypes { get; set; } // Tipos de serviços efetuados (pode ser JSON ou texto)
        
        [MaxLength(500)]
        public string? Image { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Slug { get; set; } = string.Empty;
        
        public bool IsNew { get; set; } = false; // Novo?
        
        public bool FeaturedOnHome { get; set; } = false; // Destaque na Home?
        
        public bool IsActive { get; set; } = true;
        
        public int Order { get; set; } = 0;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

