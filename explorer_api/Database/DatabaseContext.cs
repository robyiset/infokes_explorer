using explorer_api.Database.Table;
using Microsoft.EntityFrameworkCore;

namespace explorer_api.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() { }
        public DatabaseContext(DbContextOptions options) : base(options) { }

        public DbSet<tbl_directories> tbl_directories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {

        }
    }
}