namespace Squares.Server.Models;

public class User
{
    public string UserId { get; set; }
    public List<Block> Blocks { get; set; }

    public User()
    {
        UserId = string.Empty;
        Blocks = new List<Block>();
    }

    public User(string userId, List<Block> blocks)
    {
        UserId = userId;
        Blocks = blocks;
    }
}
