using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BissSolutions.Api.Models
{
    public class Product
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(2000)]
        public string? Description { get; set; }
        
        [MaxLength(50)]
        public string? CurrentVersion { get; set; } // Versão atual
        
        [MaxLength(2000)]
        public string? TechnologyItems { get; set; } // Itens de tecnologia (ex: Clean Architecture CQRS Performance .NET 9)
        
        [MaxLength(5000)]
        public string? Features { get; set; } // Características (ex: ⚡73% melhoria no tempo de resposta...)
        
        [MaxLength(500)]
        public string? NugetLink { get; set; } // Link Nuget
        
        [MaxLength(500)]
        public string? DocumentationLink { get; set; } // Link Documentação
        
        [MaxLength(500)]
        public string? GithubLink { get; set; } // Link Github
        
        [MaxLength(500)]
        public string? ProductLink { get; set; } // Link Produto (para produtos externos)
        
        [MaxLength(500)]
        public string? Image { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Price { get; set; }
        
        [MaxLength(100)]
        public string? Category { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public int Order { get; set; } = 0;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

