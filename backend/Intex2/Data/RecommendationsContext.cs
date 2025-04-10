using Microsoft.EntityFrameworkCore;
using Intex2.Models;

namespace Intex2.Data
{
    public class RecommendationsContext : DbContext
    {
        public RecommendationsContext(DbContextOptions<RecommendationsContext> options)
            : base(options)
        {
        }

        public DbSet<DetailRecommendation> DetailRecommendations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DetailRecommendation>(entity =>
            {
                entity.HasNoKey();
                entity.ToTable("Recommendations", "dbo");
            });
        }
    }
}
