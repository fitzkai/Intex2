using Microsoft.AspNetCore.Mvc;
using Intex2.Models;

namespace Intex2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private MoviesContext _moviesContext;
        public MoviesController(MoviesContext temp) => _moviesContext = temp;
        [HttpGet("AllMovies")]
        public IEnumerable<string> GetMovies()
        {
            return _moviesContext.MoviesTitles
                .Select(m => m.Title)
                .ToList();
        }

        [HttpGet("MoviesPage")]
        public IActionResult GetMoviesPage()
        {
            var coreGenres = new Dictionary<string, Func<MoviesTitle, bool>>
    {
        { "Action", m => m.Action == 1 },
        { "Adventure", m => m.Adventure == 1 },
        { "Comedy", m => m.Comedies == 1 || m.ComediesRomanticMovies == 1 },
        { "Drama", m => m.Dramas == 1 || m.TvDramas == 1 },
        { "Documentary", m => m.Documentaries == 1 || m.Docuseries == 1 },
        { "Family", m => m.FamilyMovies == 1 || m.Children == 1 || m.KidsTv == 1 },
        { "Fantasy", m => m.Fantasy == 1 },
        { "Horror", m => m.HorrorMovies == 1 },
        { "Romance", m => m.DramasRomanticMovies == 1 || m.ComediesRomanticMovies == 1 },
        { "Thriller", m => m.Thrillers == 1 || m.InternationalMoviesThrillers == 1 },
        { "Reality", m => m.RealityTv == 1 },
        { "Musical", m => m.Musicals == 1 }
    };

            var movies = _moviesContext.MoviesTitles
                .ToList()
                .Select(m =>
                {
                    var matchedGenres = coreGenres
                        .Where(g => g.Value(m))
                        .Select(g => g.Key)
                        .ToList();

                    // If nothing matched, assign "Other"
                    if (!matchedGenres.Any())
                    {
                        matchedGenres.Add("Other");
                    }

                    return new
                    {
                        m.ShowId,
                        m.Title,
                        m.Description,
                        Genre = string.Join(", ", matchedGenres)
                    };
                })
                .ToList();

            return Ok(movies);
        }

    }
}

