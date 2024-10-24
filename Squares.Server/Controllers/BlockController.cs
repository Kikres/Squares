using Microsoft.AspNetCore.Mvc;
using Squares.Server.Models;
using Squares.Server.Models.Dto.v1;
using Squares.Server.Services;
using System.Text.RegularExpressions;

namespace Squares.server.Controllers;

[ApiController]
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
    /// Retrieves the list of blocks for the user based on the cookie-stored user ID.
    /// </summary>
    /// <remarks>
    /// Retrieves the user ID from the cookie or generates a new one if it doesn't exist. 
    /// The method retrieves the blocks associated with the user and returns them as a list of <see cref="BlockDto"/> objects.
    /// </remarks>
    /// <response code="200">Returns a list of <see cref="BlockDto"/> objects for the user associated with the cookie-based user ID.</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<BlockDto>))]
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
    /// <remarks>
    /// Retrieves the user ID from the cookie or generates a new one if it doesn't exist. 
    /// The block is validated to ensure the position and HexColor are correctly set before being added to the user's block list.
    /// </remarks>
    /// <param name="blockDto">The block data to be added, represented by a <see cref="BlockDto"/> object.</param>
    /// <response code="200">The block was successfully added to the user's block list.</response>
    /// <response code="400">Returns a bad request if the block's data is invalid (e.g., missing HexColor).</response>
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

        if (string.IsNullOrEmpty(blockDto.HexColor) || !Regex.Match(blockDto.HexColor, @"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$").Success)
        {
            return BadRequest("HexColor cannot be empty.");
        }

        var blockEntity = new Block(blockDto);
        blockList.Add(blockEntity);

        _storageService.UpsertUserBlocks(userId, blockList);
        return Ok();
    }

    /// <summary>
    /// Deletes all blocks from the user's block list.
    /// </summary>
    /// <remarks>
    /// Retrieves the user ID from the cookie or generates a new one if it doesn't exist. 
    /// This action will remove all blocks associated with the user.
    /// </remarks>
    /// <response code="200">All blocks were successfully deleted from the user's block list.</response>
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult ClearBlocks()
    {
        var userId = SolveUserId();
        _storageService.ClearUserBlocks(userId);
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
