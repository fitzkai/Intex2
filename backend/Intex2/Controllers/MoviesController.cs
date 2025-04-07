using Microsoft.AspNetCore.Mvc;
using Intex2.API.Data;
namespace Intex2.Controllers
{
    [Route("[controller")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private MoviesDbContext _moviesContext;
        public MoviesController(MoviesDbContext temp) => _moviesContext = temp;
        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1)
        {
            var movieList = _moviesContext.Movies.ToList();
            return (movieList);
        }
    }
}
}

