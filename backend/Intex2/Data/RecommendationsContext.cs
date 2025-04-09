using Microsoft.EntityFrameworkCore;
using Intex2.Models; // or wherever your model class will go

namespace Intex2.Data
{
    public class RecommendationsContext : DbContext
    {
        public RecommendationsContext(DbContextOptions<RecommendationsContext> options)
            : base(options) { }

        public DbSet<Recommendation> Recommendations { get; set; }
    }
}