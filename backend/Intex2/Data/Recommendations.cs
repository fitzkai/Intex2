using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex2.Models
{
    [Table("Recommendations")]
    public class Recommendation
    {
        [Key]
        [Column("show_id")]
        public int ShowId { get; set; }

        [Column("title")]
        public string? Title { get; set; }

        [Column("CB_Recommendation 2")]
        public string? CB_Recommendation2 { get; set; }

        [Column("CB_Recommendation 3")]
        public string? CB_Recommendation3 { get; set; }

        [Column("CB_Recommendation 4")]
        public string? CB_Recommendation4 { get; set; }

        [Column("CB_Recommendation 5")]
        public string? CB_Recommendation5 { get; set; }

        [Column("CB_Recommendation 6")]
        public string? CB_Recommendation6 { get; set; }

        [Column("CF_Recommendation 2")]
        public string? CF_Recommendation2 { get; set; }

        [Column("CF_Recommendation 3")]
        public string? CF_Recommendation3 { get; set; }

        [Column("CF_Recommendation 4")]
        public string? CF_Recommendation4 { get; set; }

        [Column("CF_Recommendation 5")]
        public string? CF_Recommendation5 { get; set; }

        [Column("CF_Recommendation 6")]
        public string? CF_Recommendation6 { get; set; }
    }
}