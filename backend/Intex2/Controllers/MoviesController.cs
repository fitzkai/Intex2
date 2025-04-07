using Microsoft.AspNetCore.Mvc;
using Intex2.API.Data;
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
    }
}
}

