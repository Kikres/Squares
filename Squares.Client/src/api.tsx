import BlockDto from "./models/blockDto";

const BASE_URL = `/api/`;

export async function getBlockAsync(): Promise<BlockDto[]>
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

export async function postBlockAsync(blockDto: BlockDto): Promise<void>
{
    if (!blockDto || !blockDto.position || !blockDto.hexColor)
    {
        throw new Error("Invalid block data");
    }

    try
    {
        const response = await fetch(BASE_URL + "block", {
            method: "POST",
            body: JSON.stringify(blockDto),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok)
        {
            throw new Error(`Failed to post data (addBlock): ${response.status} ${response.statusText}`);
        }
    } catch (error)
    {
        console.error("Error in postBlockAsync:", error);
        throw error;
    }
}

export async function clearBlockAsync(): Promise<void>
{
    try
    {
        const response = await fetch(BASE_URL + "block", {
            method: "DELETE"
        });
    } catch (error)
    {
        console.error("Error in clearBlockAsync:", error);
        throw error;
    }
}

