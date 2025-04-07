using Microsoft.EntityFrameworkCore;
using Intex2.Data;

public class MoviesDbContext : DbContext
{
	public DbSet<MoviesUser> MoviesUsers { get; set; }
	public DbSet<MoviesRating> MoviesRatings { get; set; }
	public DbSet<MoviesTitle> MoviesTitles { get; set; }

	public MoviesDbContext(DbContextOptions<MoviesDbContext> options)
		: base(options)
	{
	}



	
}
