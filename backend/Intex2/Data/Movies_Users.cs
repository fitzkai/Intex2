using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class Movies_Users
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public bool Netflix { get; set; }
    [Column ("Amazon Prime")]
    public bool AmazonPrime { get; set; }
    [Column("Disney+")]
    public bool DisneyPlus { get; set; }
    [Column("Paramount+")]
    public bool ParamountPlus { get; set; }
    public bool Max { get; set; }
    public bool Hulu { get; set; }
    [Column("Apple TV+")]
    public bool  AppleTV { get; set; }
    public bool Peacock { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public int Zip { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}