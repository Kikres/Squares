using System.Text.Json.Serialization;

namespace Squares.Server.Models.Dto.v1;

public class BlockDto
{
    /// <summary>
    /// The blocks position.
    /// </summary>
    /// <example>1</example>
    public int Position { get; set; }
    /// <summary>
    /// The color of the block.
    /// </summary>
    /// <example>#FF0000</example>
    public string HexColor { get; set; }

    [JsonConstructor]
    public BlockDto(int position, string hexColor)
    {
        Position = position;
        HexColor = hexColor;
    }

    public BlockDto(Block block)
    {
        Position = block.Position;
        HexColor = block.HexColor;
    }
}
