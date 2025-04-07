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
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1)
        {
            var query = _moviesContext.MoviesTitles.AsQueryable();

            var totalNumMovies = query.Count();

            var movies = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .Select(m => m.Title)
                .ToList();

            var result = new
            {
                Movies = movies,
                TotalNumMovies = totalNumMovies,
            };

            return Ok(result);
        }

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            _moviesContext.MoviesTitles.Add(newMovie);
            _moviesContext.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{ShowId}")]
        public IActionResult UpdateMovie(string ShowId, [FromBody] MoviesTitle updatedMovie)
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
            //existingMovie.Genre = updatedMovie.Genre;

            _moviesContext.MoviesTitles.Update(existingMovie);
            _moviesContext.SaveChanges();

            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{ShowId}")]
        public IActionResult DeleteMovie(string ShowId) 
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
    }
}