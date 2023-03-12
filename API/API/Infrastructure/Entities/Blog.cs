using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Infrastructure.Entities
{
    public class Blog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column(TypeName = "varchar(MAX)")]
        public string Title { get; set; } = string.Empty;
        [Column(TypeName = "varchar(MAX)")]
        public string SubTitle { get; set; } = string.Empty;
        [Column(TypeName = "varchar(MAX)")]
        public string Description { get; set; } = string.Empty;
        [Column(TypeName = "varchar(MAX)")]
        public string ImageUrl { get; set; } = string.Empty;
        public int ViewCount { get; set; }
        public int ReadCount { get; set; }
        public int RecommendCount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string CreatedBy { get; set; } = string.Empty;
        public string UpdatedBy { get; set; } = string.Empty;
        public bool IsPublish { get; set; }
        public bool IsDelete { get; set; }
    }
}
