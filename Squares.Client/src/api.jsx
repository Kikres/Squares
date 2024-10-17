export async function getBlockAsync()
{
    const response = await fetch(`api/block`);

    if (!response.ok)
    {
        throw new Response("Failed to fetch data (getBlocks)", response.status);
    }

    return response.json();
}

export async function postBlockAsync(block)
{
    const response = await fetch(`api/block`, {
        method: "POST",
        body: JSON.stringify(block),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok)
    {
        throw new Response("Failed to post data (addBlock)", response.status);
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