using System.ComponentModel.DataAnnotations;

namespace BissSolutions.Api.Models
{
    public class Page
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(200)]
        public string Slug { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [MaxLength(200)]
        public string? MetaTitle { get; set; }
        
        [MaxLength(300)]
        public string? MetaDescription { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public int Order { get; set; } = 0;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        public List<Component> Components { get; set; } = new();
        public List<Image> Images { get; set; } = new();
    }
}
