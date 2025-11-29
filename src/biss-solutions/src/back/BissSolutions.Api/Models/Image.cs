using System.ComponentModel.DataAnnotations;

namespace BissSolutions.Api.Models
{
    public class Image
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string FileName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        public string OriginalName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(500)]
        public string Path { get; set; } = string.Empty;
        
        [MaxLength(200)]
        public string? Alt { get; set; }
        
        [MaxLength(200)]
        public string? Title { get; set; }
        
        public int? ComponentId { get; set; }
        
        public int? PageId { get; set; }
        
        [MaxLength(50)]
        public string? Category { get; set; } // "hero", "service", "client", etc.
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public Component? Component { get; set; }
        
        public Page? Page { get; set; }
    }
}
