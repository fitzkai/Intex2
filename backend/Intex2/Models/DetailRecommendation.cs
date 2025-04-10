using System.ComponentModel.DataAnnotations.Schema;

namespace Intex2.Models
{
    public class DetailRecommendation
    {
        [Column("show_id")]
        public int ShowId { get; set; }
        [Column("Title")] 
        public string Title { get; set; }
        [Column("CB_Recommendation_2")]
        public string Recommendation1 { get; set; }
        [Column("CB_Recommendation_3")]
        public string Recommendation2 { get; set; }
        [Column("CB_Recommendation_4")]
        public string Recommendation3 { get; set; }
        [Column("CB_Recommendation_5")]
        public string Recommendation4 { get; set; }
        [Column("CB_Recommendation_6")]
        public string Recommendation5 { get; set; }
        [Column("CF_Recommendation_2")]
        public string? Recommendation6 { get; set; }
        [Column("CF_Recommendation_3")]
        public string? Recommendation7 { get; set; }
        [Column("CF_Recommendation_4")]
        public string? Recommendation8 { get; set; }
        [Column("CF_Recommendation_5")]
        public string? Recommendation9 { get; set; }
        [Column("CF_Recommendation_6")]
        public string? Recommendation10 { get; set; }

    }
}
