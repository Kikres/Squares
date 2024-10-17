namespace Squares.Server.Models;

public class User
{
    public string UserId { get; set; }
    public DateTime CreationDate { get; set; }
    public List<Block> Blocks { get; set; }

    public User()
    {
        UserId = string.Empty;
        CreationDate = DateTime.Now;
        Blocks = new List<Block>();
    }

    public User(string userId, List<Block> blocks)
    {
        UserId = userId;
        CreationDate = DateTime.Now;
        Blocks = blocks;
    }
}
