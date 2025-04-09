using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Intex2.Models;

public partial class MoviesContext : DbContext
{
    public MoviesContext()
    {
    }
    public MoviesContext(DbContextOptions<MoviesContext> options)
        : base(options)
    {
    }
    public virtual DbSet<MoviesRating> MoviesRatings { get; set; }
    public virtual DbSet<MoviesTitle> MoviesTitles { get; set; }
    public virtual DbSet<MoviesUser> MoviesUsers { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=Movies.db");
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MoviesUser>(entity =>
        {
            entity.HasKey(e => e.UserId); // ✅ Explicitly define the PK

            entity.ToTable("movies_users");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Gender).HasColumnName("gender");
            entity.Property(e => e.City).HasColumnName("city");
            entity.Property(e => e.State).HasColumnName("state");
            entity.Property(e => e.Zip).HasColumnName("zip");

            entity.Property(e => e.Netflix).HasColumnName("Netflix");
            entity.Property(e => e.AmazonPrime).HasColumnName("Amazon Prime");
            entity.Property(e => e.Disney).HasColumnName("Disney+");
            entity.Property(e => e.Paramount).HasColumnName("Paramount+");
            entity.Property(e => e.Max).HasColumnName("Max");
            entity.Property(e => e.Hulu).HasColumnName("Hulu");
            entity.Property(e => e.AppleTv).HasColumnName("Apple TV+");
            entity.Property(e => e.Peacock).HasColumnName("Peacock");
        });

        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
