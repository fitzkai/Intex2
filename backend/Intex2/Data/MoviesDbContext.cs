using Intex2.API.Data;
using Intex2.Data;
using Microsoft.EntityFrameworkCore;

public class MoviesDbContext : DbContext
{
	public MoviesDbContext(DbContextOptions<MoviesDbContext> options)
		: base(options)
	{
	}
	public DbSet<Movies_Users> movies_users { get; set; }
	public DbSet<Movies_Ratings> movies_ratings { get; set; }
	public DbSet<Movies_Titles> movies_titles { get; set; }

	



	
}
