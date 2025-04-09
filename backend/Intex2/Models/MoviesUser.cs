using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex2.Models;

[Table("movies_users")] // <-- optional but good
public class MoviesUser
{
    [Key]
    [Column("user_id")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }

    public string? Name { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public int? Age { get; set; }
    public string? Gender { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public int? Zip { get; set; }

    public int? Netflix { get; set; }
    public int? AmazonPrime { get; set; }
    public int? Disney { get; set; }
    public int? Paramount { get; set; }
    public int? Max { get; set; }
    public int? Hulu { get; set; }
    public int? AppleTv { get; set; }
    public int? Peacock { get; set; }

    //public string? PasswordHash { get; set; }
}