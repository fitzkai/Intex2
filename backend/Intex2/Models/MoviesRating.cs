using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Intex2.Models;

public partial class MoviesRating
{
    [Key]
    public int? UserId { get; set; }

    public int? ShowId { get; set; }

    public int? Rating { get; set; }
}
