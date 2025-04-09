using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2.Data;
using Intex2.Models;
using Intex2.Services;

namespace Intex2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly RecommendationsContext _context;

        private readonly AzureMLService _mlService;
        private readonly MoviesContext _moviesContext;



        public RecommendationsController(RecommendationsContext context, AzureMLService mlService)
        {
            _context = context;
            _mlService = mlService;
        }

        // GET: api/Recommendations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recommendation>>> GetAllRecommendations()
        {
            return await _context.Recommendations.ToListAsync();
        }


        // GET: api/Recommendations/5
        // ✅ 1. Keep exact string routes first
        [HttpPost("ml")]
        public async Task<IActionResult> GetMLRecommendations([FromBody] List<InputItem> input)
        {
            var result = await _mlService.GetRecommendationsAsync(input);

            if (result == null || result.Results.WebServiceOutput0.Count == 0)
                return StatusCode(500, "Failed to get predictions from Azure ML");

            return Ok(result.Results.WebServiceOutput0.First());
        }

// 🔍 2. Search by title

        // GET: api/Recommendations/search?title=Inception

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Recommendation>>> SearchByTitle(string title)
        {
            var results = await _context.Recommendations
                .Where(r => r.Title.Contains(title))
                .ToListAsync();

            return Ok(results);
        }


// 🔢 3. Route with parameter goes LAST

        [HttpGet("Title/{title}")]
        public async Task<ActionResult<Recommendation>> GetMovieByTitle(string title)
        {
            var movie = await _context.Recommendations
                .FirstOrDefaultAsync(m =>
                    EF.Functions.Like(m.Title.ToLower(), $"%{title.ToLower().Trim()}%"));

            if (movie == null)
                return NotFound();

            return Ok(movie);
        }

        public class RecommendationWithMoviesDto
        {
            public int ShowId { get; set; }
            public string? Title { get; set; }
            public List<MoviesTitle> RecommendedMovies { get; set; } = new();
        }


        [HttpGet("{showId}")]
        public async Task<ActionResult<RecommendationWithMoviesDto>> GetRecommendationByShowId(int showId)
        {
            var recommendation = await _context.Recommendations
                .FirstOrDefaultAsync(r => r.ShowId == showId);

            if (recommendation == null)
            {
                return NotFound(new { message = "Recommendation not found." });
            }

            var recommendedTitles = new List<string?>
            {
                recommendation.CB_Recommendation2,
                recommendation.CB_Recommendation3,
                recommendation.CB_Recommendation4,
                recommendation.CB_Recommendation5,
                recommendation.CB_Recommendation6,
                recommendation.CF_Recommendation2,
                recommendation.CF_Recommendation3,
                recommendation.CF_Recommendation4,
                recommendation.CF_Recommendation5,
                recommendation.CF_Recommendation6
            }
            .Where(title => !string.IsNullOrWhiteSpace(title) && title != "0")
            .Select(title => title!.Trim())
            .ToList();

            var recommendedMovies = await _moviesContext.MoviesTitles
            .Where(m => recommendedTitles.Contains(m.Title))
            .ToListAsync();

            var dto = new RecommendationWithMoviesDto
            {
                ShowId = recommendation.ShowId,
                Title = recommendation.Title,
                RecommendedMovies = recommendedMovies
            };


            return Ok(dto);
        }



    }
}