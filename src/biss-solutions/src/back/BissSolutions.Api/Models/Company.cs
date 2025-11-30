using System;
using System.ComponentModel.DataAnnotations;

namespace BissSolutions.Api.Models
{
    public class Company
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [MaxLength(2000)]
        public string? Description { get; set; } // Descrição
        
        [MaxLength(2000)]
        public string? Mission { get; set; }
        
        [MaxLength(2000)]
        public string? Vision { get; set; }
        
        [MaxLength(2000)]
        public string? Values { get; set; }
        
        [MaxLength(5000)]
        public string? History { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

