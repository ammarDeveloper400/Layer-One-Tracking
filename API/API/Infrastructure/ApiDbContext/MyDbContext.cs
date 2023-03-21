using API.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Emit;

namespace API.Infrastructure.ApiDbContext
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> context)
           : base(context)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Blog>()
            .Property(s => s.Description)
            .HasColumnType("ntext");
        }

        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Blog> Blog { get; set; }
        public DbSet<BlogActivityLog> BlogActivityLog { get; set; }

    }
}
