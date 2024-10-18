using Microsoft.AspNetCore.Mvc;
using Squares.Server.Models;
using Squares.Server.Services;

namespace Squares.server.Controllers;

[Area("api")]
[Route("api/[controller]")]
public class BlockController : ControllerBase
{
    private StorageService _storageService;

    public BlockController(StorageService storageService)
    {
        _storageService = storageService;
    }

    /// <summary>
    /// Retrieves the list of blocks for the user.
    /// </summary>
    /// <returns>A list of BlockDto objects.</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetBlocks()
    {
        var userId = SolveUserId();

        var blockList = _storageService.LoadUserBlocks(userId);
        var blockDtoList = blockList.Select(o => new BlockDto(o));

        return Ok(blockDtoList);
    }

    /// <summary>
    /// Adds a new block to the user's block list.
    /// </summary>
    /// <param name="blockDto">BlockDto containing the block data.</param>
    /// <returns>Status 200 OK if successful.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult AddBlock([FromBody]BlockDto blockDto)
    {
        var userId = SolveUserId();
        var blockList = _storageService.LoadUserBlocks(userId);

        // Validate the block data
        if (blockDto.Position <= blockList.Count)
        {
            blockDto.Position = blockList.Count + 1;
        }

        if (string.IsNullOrEmpty(blockDto.HexColor))
        {
            return BadRequest("HexColor cannot be empty.");
        }

        var blockEntity = new Block(blockDto);
        blockList.Add(blockEntity);

        _storageService.UpsertUserBlocks(userId, blockList);
        return Ok();
    }

    /// <summary>
    /// Retrieves the user ID from the cookies, or generates a new one if it doesn't exist.
    /// </summary>
    /// <returns>A user ID string, either from an existing cookie or newly generated.</returns>
    private string SolveUserId()
    {
        // Check for cookie, create if there is none
        if (!Request.Cookies.TryGetValue("UserId", out string? userId))
        {
            userId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddYears(1),
                HttpOnly = true,
                Secure = true,
                IsEssential = true
            };

            Response.Cookies.Append("UserId", userId, cookieOptions);
        }

        return userId;
    }
}
