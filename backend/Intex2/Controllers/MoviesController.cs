using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Intex2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;


namespace Intex2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private MoviesContext _moviesContext;
        public MoviesController(MoviesContext temp) => _moviesContext = temp;

        [HttpGet("AllMovies")]
        [Authorize] //(Roles = "Administrator")
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1)
        {
            var query = _moviesContext.MoviesTitles.AsQueryable();
            var totalNumMovies = query.Count();
            var movies = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var result = new
            {
                movies = movies,
                TotalNumMovies = totalNumMovies,
            };
            return Ok(result);
        }

        // Reusable genre-detection logic
        private Dictionary<string, Func<MoviesTitle, bool>> CoreGenres => new()
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
        private string SanitizeFileName(string title)
        {
            return Regex.Replace(title, @"[^\p{L}\p{Nd} ]+", "");
        }

        [HttpPost("AddMovie")]
        [Authorize]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            _moviesContext.MoviesTitles.Add(newMovie);
            _moviesContext.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{ShowId}")]
        [Authorize]
        public IActionResult UpdateMovie(int ShowId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _moviesContext.MoviesTitles.Find(ShowId);

            existingMovie.Type = updatedMovie.Type;
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Cast = updatedMovie.Cast;
            existingMovie.Country = updatedMovie.Country;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Duration = updatedMovie.Duration;
            existingMovie.Description = updatedMovie.Description;
            _moviesContext.MoviesTitles.Update(existingMovie);
            _moviesContext.SaveChanges();
            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{ShowId}")]
        [Authorize]
        public IActionResult DeleteMovie(int ShowId)
        {
            var movie = _moviesContext.MoviesTitles.Find(ShowId);

            if (movie == null)
            {
                return NotFound(new { message = "Movie Not Found" });
            }
            _moviesContext.MoviesTitles.Remove(movie);
            _moviesContext.SaveChanges();
            return NoContent();
        }

        [HttpGet("MoviesPage")]
        [Authorize]
        public IActionResult GetMoviesPage()
        {
            var movies = _moviesContext.MoviesTitles
                .ToList()
                .Select(m =>
                {
                    var matchedGenres = CoreGenres
                        .Where(g => g.Value(m))
                        .Select(g => g.Key)
                        .ToList();
                    if (!matchedGenres.Any())
                        matchedGenres.Add("Other");
                    return new
                    {
                        m.ShowId,
                        m.Title,
                        m.Description,
                        Genre = string.Join(", ", matchedGenres),
                        ImagePath = $"/images/movie-posters/{Uri.EscapeDataString(SanitizeFileName(m.Title))}.jpg"
                    };
                })
                .ToList();
            return Ok(movies);
        }

        [HttpGet("MoviesPage/{id}")]
        [Authorize]
        public IActionResult GetMovieById(int id)
        {
            var movieEntity = _moviesContext.MoviesTitles
                .FirstOrDefault(m => m.ShowId == id);
            if (movieEntity == null)
                return NotFound();
            var matchedGenres = CoreGenres
                .Where(g => g.Value(movieEntity))
                .Select(g => g.Key)
                .ToList();
            if (!matchedGenres.Any())
                matchedGenres.Add("Other");
            var movie = new
            {
                movieEntity.ShowId,
                movieEntity.Title,
                movieEntity.Type,
                movieEntity.Director,
                movieEntity.Cast,
                movieEntity.ReleaseYear,
                movieEntity.Country,
                movieEntity.Rating,
                movieEntity.Duration,
                movieEntity.Description,
                Genre = string.Join(", ", matchedGenres),
                ImagePath = $"/images/movie-posters/{Uri.EscapeDataString(SanitizeFileName(movieEntity.Title))}.jpg"
            };
            return Ok(movie);
        }

        [HttpGet("CheckRoles")]
        [Authorize]
        public IActionResult CheckRoles()
        {
            return Ok(new
            {
                User = User.Identity?.Name,
                IsAuthenticated = User.Identity?.IsAuthenticated,
                Roles = User.Claims
                    .Where(c => c.Type == System.Security.Claims.ClaimTypes.Role)
                    .Select(c => c.Value)
                    .ToList()
            });
        }

        [HttpPost("AddUserInfo")]
        public IActionResult AddUserInfo([FromBody] MoviesUser user)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(user.Name) || user.Age == null || string.IsNullOrWhiteSpace(user.City))
                {
                    return BadRequest("Missing or invalid required fields.");
                }

                // Default 0s for nulls
                user.Netflix ??= 0;
                user.AmazonPrime ??= 0;
                user.Disney ??= 0;
                user.Paramount ??= 0;
                user.Max ??= 0;
                user.Hulu ??= 0;
                user.AppleTv ??= 0;
                user.Peacock ??= 0;

                _moviesContext.MoviesUsers.Add(user);
                _moviesContext.SaveChanges();
                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR saving MoviesUser: " + ex.Message);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}