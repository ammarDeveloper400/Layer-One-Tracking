using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Infrastructure.Entities
{
    public class BlogActivityLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual Blog Blog { get; set; }
        public int ViewCount { get; set; }
        public int ReadCount { get; set; }
        public int RecommendCount { get; set; }
    }
}
