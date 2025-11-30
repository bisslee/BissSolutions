using System;
using System.ComponentModel.DataAnnotations;

namespace BissSolutions.Api.Models
{
    public class Company
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        // Informações Básicas
        [MaxLength(200)]
        public string? Name { get; set; } // Nome da empresa
        
        [MaxLength(200)]
        public string? LegalName { get; set; } // Razão Social
        
        [MaxLength(18)]
        public string? CNPJ { get; set; } // CNPJ
        
        // Contato
        [MaxLength(100)]
        public string? Email { get; set; } // E-mail principal
        
        [MaxLength(50)]
        public string? Phone { get; set; } // Telefone principal
        
        [MaxLength(500)]
        public string? Website { get; set; } // Site
        
        // Endereço
        [MaxLength(500)]
        public string? Address { get; set; } // Endereço completo
        
        [MaxLength(100)]
        public string? City { get; set; } // Cidade
        
        [MaxLength(50)]
        public string? State { get; set; } // Estado
        
        [MaxLength(10)]
        public string? ZipCode { get; set; } // CEP
        
        // Redes Sociais
        [MaxLength(500)]
        public string? LinkedInUrl { get; set; }
        
        [MaxLength(500)]
        public string? FacebookUrl { get; set; }
        
        [MaxLength(500)]
        public string? InstagramUrl { get; set; }
        
        [MaxLength(500)]
        public string? TwitterUrl { get; set; }
        
        [MaxLength(500)]
        public string? YouTubeUrl { get; set; }
        
        // Mídia
        [MaxLength(500)]
        public string? LogoUrl { get; set; } // URL do logo
        
        [MaxLength(500)]
        public string? BannerUrl { get; set; } // URL do banner/imagem de capa
        
        // Informações Institucionais
        [MaxLength(2000)]
        public string? Description { get; set; } // Descrição geral
        
        [MaxLength(2000)]
        public string? Mission { get; set; } // Missão
        
        [MaxLength(2000)]
        public string? Vision { get; set; } // Visão
        
        [MaxLength(2000)]
        public string? Values { get; set; } // Valores
        
        [MaxLength(5000)]
        public string? History { get; set; } // História
        
        // Informações Adicionais
        public int? FoundedYear { get; set; } // Ano de fundação
        
        [MaxLength(50)]
        public string? NumberOfEmployees { get; set; } // Número de funcionários (ex: "10-50", "50+")
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

