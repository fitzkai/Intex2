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
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Recommendation>>> SearchByTitle(string title)
        {
            var results = await _context.Recommendations
                .Where(r => r.Title.Contains(title))
                .ToListAsync();

            return Ok(results);
        }

// 🔢 3. Route with parameter goes LAST
        [HttpGet("{showId}")]
        public async Task<ActionResult<Recommendation>> GetRecommendationByShowId(int showId)
        {
            var recommendation = await _context.Recommendations
                .FirstOrDefaultAsync(r => r.ShowId == showId);

            if (recommendation == null)
            {
                return NotFound(new { message = "Recommendation not found." });
            }

            return recommendation;
        }





    }
}