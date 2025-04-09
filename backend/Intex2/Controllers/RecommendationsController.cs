using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2.Data;
using Intex2.Models;

namespace Intex2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly RecommendationsContext _context;

        public RecommendationsController(RecommendationsContext context)
        {
            _context = context;
        }

        // GET: api/Recommendations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recommendation>>> GetAllRecommendations()
        {
            return await _context.Recommendations.ToListAsync();
        }

        // GET: api/Recommendations/5
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

        // GET: api/Recommendations/search?title=Inception
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Recommendation>>> SearchByTitle(string title)
        {
            var results = await _context.Recommendations
                .Where(r => r.Title.Contains(title))
                .ToListAsync();

            return results;
        }
    }
}