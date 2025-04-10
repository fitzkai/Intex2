using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex2.Models
{
    [Table("Recommendations")]
    public class Recommendation
    {
        [Key]
        [Column("show_id")]
        public long ShowId { get; set; }

        [Column("title")]
        public string? Title { get; set; }

        [Column("CB_Recommendation_2")]
        public string? CB_Recommendation2 { get; set; }

        [Column("CB_Recommendation_3")]
        public string? CB_Recommendation3 { get; set; }

        [Column("CB_Recommendation_4")]
        public string? CB_Recommendation4 { get; set; }

        [Column("CB_Recommendation_5")]
        public string? CB_Recommendation5 { get; set; }

        [Column("CB_Recommendation_6")]
        public string? CB_Recommendation6 { get; set; }

        [Column("CF_Recommendation_2")]
        public string? CF_Recommendation2 { get; set; }

        [Column("CF_Recommendation_3")]
        public string? CF_Recommendation3 { get; set; }

        [Column("CF_Recommendation_4")]
        public string? CF_Recommendation4 { get; set; }

        [Column("CF_Recommendation_5")]
        public string? CF_Recommendation5 { get; set; }

        [Column("CF_Recommendation_6")]
        public string? CF_Recommendation6 { get; set; }
    }
}