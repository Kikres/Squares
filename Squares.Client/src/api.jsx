const BASE_URL = `/api/`;

export async function getBlockAsync()
{
    try
    {
        const response = await fetch(BASE_URL + "block");
        if (!response.ok)
        {
            throw new Error(`Failed to fetch data (getBlocks): ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error)
    {
        console.error("Error in getBlockAsync:", error);
        throw error;
    }
}

export async function postBlockAsync(block)
{
    if (!block || !block.position || !block.hexColor)
    {
        throw new Error("Invalid block data");
    }

    try
    {
        const response = await fetch(BASE_URL + "block", {
            method: "POST",
            body: JSON.stringify(block),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok)
        {
            throw new Error(`Failed to post data (addBlock): ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error)
    {
        console.error("Error in postBlockAsync:", error);
        throw error;
    }
}

export class Block
{
    constructor(position, hexColor)
    {
        this.position = position;
        this.hexColor = hexColor;
    }
}
