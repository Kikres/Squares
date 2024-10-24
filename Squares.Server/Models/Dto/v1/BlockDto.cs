using System.Text.Json.Serialization;

namespace Squares.Server.Models.Dto.v1;

public class BlockDto
{
    public int Position { get; set; }
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
