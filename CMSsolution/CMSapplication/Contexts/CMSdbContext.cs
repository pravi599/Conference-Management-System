using CMSapplication.Models;
using Microsoft.EntityFrameworkCore;

namespace CMSapplication.Contexts
{
    public class CMSdbContext : DbContext
    {

        public CMSdbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Conference> Conferences { get; set; }
    }
}
