using System.Text.Json.Serialization;

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
