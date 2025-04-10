using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2.Data;
using Intex2.Models;
using Intex2.Services;

namespace Intex2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class RecommendationsController : ControllerBase
    {
        private readonly RecommendationsContext _context;

        public RecommendationsController(RecommendationsContext context)
        {
            _context = context;
        }

        [HttpGet("{showId}")]
        public async Task<IActionResult> GetRecommendations(long showId)
        {
            var recommendation = await _context.DetailRecommendations
                .FirstOrDefaultAsync(r => r.ShowId == showId);

            if (recommendation == null)
                return NotFound();

            return Ok(recommendation);
        }

    }
}