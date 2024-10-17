using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Squares.server.Models;

namespace Squares.server.Controllers
{
    [Area("api")]
    [Route("api/[controller]")]
    public class BlockController : ControllerBase
    {
        public List<BlockDto> TestList { get; set; }

        public BlockController()
        {
            TestList = new List<BlockDto>
            {
                new BlockDto { Position = 1, HexColor = "#FF0000" },
                new BlockDto { Position = 2, HexColor = "#00FF00" },
                new BlockDto { Position = 3, HexColor = "#0000FF" },
                new BlockDto { Position = 4, HexColor = "#0000FF" }
            };
        }

        [HttpGet]
        public IActionResult GetBlocks()
        {
            return Ok(TestList);
        }

        [HttpPost]
        public IActionResult AddBlock([FromBody]BlockDto blockDto)
        {
            TestList.Add(blockDto);
            return Ok();
        }
    }
}
