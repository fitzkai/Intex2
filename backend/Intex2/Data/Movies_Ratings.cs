using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Intex2.Data
{


    public class Movies_Ratings
    {
        [Key]
        [Column("user_id")] public int UserId { get; set; }
        [Column("show_id")] public string ShowId { get; set; }
        [Column("rating")] public int Rating { get; set; }

    }
}