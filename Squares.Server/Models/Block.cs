using System.Text.Json.Serialization;
using Squares.Server.Models.Dto.v1;

namespace Squares.Server.Models;

public class Block
{
    public int Position { get; set; }
    public string HexColor { get; set; }

    [JsonConstructor]
    public Block(int position, string hexColor)
    {
        Position = position;
        HexColor = hexColor;
    }

    public Block(BlockDto blockDto)
    {
        Position = blockDto.Position;
        HexColor = blockDto.HexColor;
    }
}
