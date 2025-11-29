using System.ComponentModel.DataAnnotations;

namespace BissSolutions.Api.Models
{
    public class Component
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty; // "carousel", "section", "card", etc.
        
        [MaxLength(200)]
        public string? Title { get; set; }
        
        public string? Content { get; set; }
        
        public string? Configuration { get; set; } // JSON
        
        public int PageId { get; set; }
        
        public int Order { get; set; } = 0;
        
        public bool IsActive { get; set; } = true;
        
        public Page? Page { get; set; }
        
        public List<Image> Images { get; set; } = new();
    }
}
