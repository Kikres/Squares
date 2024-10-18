import { useEffect, useState } from 'react';
import { Block, getBlockAsync, postBlockAsync } from './api.jsx';
import { randomHexColor } from './util.jsx';
import './app.jsx.css';

export default function app()
{
    const [squares, setSquares] = useState([]);

    const fetchData = async () =>
    {
        try
        {
            const squareArray = await getBlockAsync();
            setSquares(squareArray);

        }
        catch (e)
        {
            const retryAfter = 1; // Seconds
            console.log(`Retry in: ${retryAfter} seconds`);
            setTimeout(() => fetchData(), retryAfter * 1000);
        }
    };

    // Fetch data on component mount
    useEffect(() =>
    {
        fetchData();
    }, []);

    // One block equals one unit, a completed square follows x^2 whre x is width in units. width = sqrt(no of units), round up to stay within integer domain.
    const rowLength = Math.ceil(Math.sqrt(squares.length));

    const buttonHandler = async () =>
    {
        // Guard against generating the same color twice in a row
        let hexColor = "";
        while (squares[squares.length - 1]?.hexColor === hexColor || hexColor === "")
        {
            hexColor = randomHexColor();
        }

        // Create a new block and post it
        const newBlock = new Block(squares.length + 1, hexColor);
        await postBlockAsync(newBlock);

        // Refresh data to include the newly added block
        fetchData();
    };

    return (
        <div className="main">
            <div className="grid-container" style={{ gridTemplateColumns: `repeat(${rowLength}, 1fr)` }}>
                {squares.map((block) => (
                    <div
                        className="grid-block"
                        style={{ backgroundColor: block.hexColor }}
                        key={block.position}
                    >
                    </div>
                ))}
            </div>
            <button onClick={buttonHandler}>Lägg till ruta</button>
        </div>
    );
}
