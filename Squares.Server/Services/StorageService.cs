using System.Text.Json;
using Squares.Server.Models;

namespace Squares.Server.Services;

public class StorageService
{
    private readonly string _filePath = "storage.json";
    private readonly object _fileLock = new object();

    /// <summary>
    /// Loads the list of blocks for a specific user from the storage file.
    /// If no blocks exist for the user, returns an empty list.
    /// </summary>
    /// <param name="userId">The user ID associated with the blocks.</param>
    /// <returns>A list of Block objects for the given user.</returns>
    public List<Block> LoadUserBlocks(string userId)
    {
        var userList = ReadJsonFile();
        var user = userList.FirstOrDefault(o => o.UserId == userId);

        return user?.Blocks ?? new List<Block>();
    }

    /// <summary>
    /// Inserts or updates the block list for a specific user and writes the changes to the storage file.
    /// </summary>
    /// <param name="userId">The user ID associated with the blocks.</param>
    /// <param name="blocks">The updated list of Block objects.</param>
    public void UpsertUserBlocks(string userId, List<Block> blocks)
    {
        var userList = ReadJsonFile();
        var user = userList.FirstOrDefault(o => o.UserId == userId);
        
        if (user == null)
        {
            user = new User(userId, blocks);
            userList.Add(user);
        }
        else
        {
            user.Blocks = blocks;
        }
        
        WriteJsonFile(userList);
    }
    
    /// <summary>
    /// Deletes the block list for a specific user and writes the changes to the storage file.
    /// </summary>
    /// <param name="userId">The user ID associated with the blocks.</param>
    public void ClearUserBlocks(string userId)
    {
        var userList = ReadJsonFile();
        var user = userList.FirstOrDefault(o => o.UserId == userId);

        if (user == null) return;

        user.Blocks = new List<Block>();
        
        WriteJsonFile(userList);
    }

    /// <summary>
    /// Reads the storage JSON file and returns the list of users and their associated block lists.
    /// If the file is empty or doesn't exist, returns an empty list.
    /// </summary>
    /// <returns>A list of User objects.</returns>
    private List<User> ReadJsonFile()
    {
        lock (_fileLock)
        {
            try
            {
                if (File.Exists(_filePath))
                {
                    var jsonData = File.ReadAllText(_filePath);

                    if (!string.IsNullOrEmpty(jsonData))
                    {
                        var userList = JsonSerializer.Deserialize<List<User>>(jsonData);
                        return userList ?? new List<User>();
                    }
                }
            }
            catch (Exception ex)
            {
                // Real logging would be better here, but for simplicity, we'll just write to the console

                Console.WriteLine($"Error reading JSON file: {ex.Message}");
            }

            return new List<User>();
        }
    }

    /// <summary>
    /// Writes the list of users and their block data back to the storage JSON file.
    /// </summary>
    /// <param name="userList">The list of users and their blocks to save.</param>
    private void WriteJsonFile(List<User> userList)
    {
        lock (_fileLock)
        {
            try
            {
                var jsonData = JsonSerializer.Serialize(userList, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(_filePath, jsonData);
            }
            catch (Exception ex)
            {
                // Real logging would be better here, but for simplicity, we'll just write to the console
                Console.WriteLine($"Error writing to JSON file: {ex.Message}");
            }
        }
    }
}
