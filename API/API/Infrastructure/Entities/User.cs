using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Metrics;

namespace API.Infrastructure.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column(TypeName = "varchar(MAX)")]
        public string FirstName { get; set; } = string.Empty;
        [Column(TypeName = "varchar(MAX)")]
        public string LastName { get; set; } = string.Empty;
        [Column(TypeName = "varchar(MAX)")]
        public string Email { get; set; } = string.Empty;
        [Column(TypeName = "varchar(MAX)")]
        public string Password { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual Role Role { get; set; }
    }
}
