using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex2.API.Data
{
    public class Movies_Titles
    {
        [Key]
        [Column("show_id")] public string ShowId { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Director { get; set; }
        public string Cast { get; set; }
        public string Country { get; set; }
        [Column("release_year")] public int ReleaseYear { get; set; }
        public string Rating { get; set; }
        public string Duration { get; set; }
        public string Description { get; set; }
        public int Action { get; set; }
        public int Adventure { get; set; }

        [Column("Anime Series International TV Shows")]
        public int AnimeSeriesInternationalTVShows { get; set; }

        [Column("British TV Shows Docuseries International TV Shows")]
        public int BritishTVShowsDocuseries { get; set; }

        public int Children { get; set; }
        public int Comedies { get; set; }

        [Column("Comedies Dramas International Movies")]
        public int ComediesDramasInternationalMovies { get; set; }

        [Column("Comedies International Movies")]
        public int ComediesInternationalMovies { get; set; }

        [Column("Comedies Romantic Movies")] public int ComediesRomanticMovies { get; set; }
        [Column("Crime TV Shows Docuseries")] public int CrimeTVShowsDocuseries { get; set; }
        public int Documentaries { get; set; }

        [Column("Documentaries International Movies")]
        public int DocumentariesInternationalMovies { get; set; }

        public int Docuseries { get; set; }
        public int Dramas { get; set; }

        [Column("Dramas International Movies")]
        public int DramasInternationalMovies { get; set; }

        [Column("Dramas Romantic Movies")] public int DramasRomanticMovies { get; set; }
        [Column("Family Movies")] public int FamilyMovies { get; set; }
        public int Fantasy { get; set; }
        [Column("Horror Movies")] public int HorrorMovies { get; set; }

        [Column("International Movies Thrillers")]
        public int InternationalMoviesThrillers { get; set; }

        [Column("International TV Shows Romantic TV Shows TV Dramas")]
        public int InternationalTVShowsRomanticTVShows { get; set; }

        [Column("Kids' TV")] public int KidsTV { get; set; }
        [Column("Language TV Shows")] public int LanguageTVShows { get; set; }
        public int Musicals { get; set; }
        [Column("Nature TV")] public int NatureTV { get; set; }
        [Column("Reality TV")] public int RealityTV { get; set; }
        public int Spirituality { get; set; }
        [Column("TV Action")] public int TVAction { get; set; }
        [Column("TV Comedies")] public int TVComedies { get; set; }
        [Column("TV Dramas")] public int TVDramas { get; set; }
        [Column("Talk Shows TV Comedies")] public int TalkShowsTVComedies { get; set; }
        public int Thrillers { get; set; }
    }
}