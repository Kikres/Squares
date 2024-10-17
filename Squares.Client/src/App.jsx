import { useEffect, useState } from 'react';
import { randomHexColor } from './util.jsx';
import './app.jsx.css';
import { Square, getBlockAsync, postBlockAsync } from './api.jsx';

export default function app()
{
    const [squares, setSquares] = useState([]);

    // Fetch data on component mount
    useEffect(() =>
    {
        async function fetchData()
        {
            const squareArray = await getBlockAsync();
            setSquares(squareArray);
        }
        fetchData();
    }, []);

    // One block equals one unit, a completed square follows x^2 whre x is width in units. width = sqrt(no of units), round up to stay within integer domain.
    const rowLength = Math.ceil(Math.sqrt(squares.length));

    const buttonHandler = async () =>
    {
        // Guard against generating the same color twice in a row
        let generatedColor = "";
        while (squares[-1]?.color === generatedColor || generatedColor === "")
        {
            generatedColor = randomHexColor();
        }

        // Create a new block and post it
        const newBlock = new Square(squares.length + 1, generatedColor);
        await postBlockAsync(newBlock);

        // Trigger re-render
        setSquares((prevBlocks) => [...prevBlocks, newBlock]);
    };

    return (
        <div className="main">
            {/*<div>⟳</div>*/}
            <div className="grid-container" style={{ gridTemplateColumns: `repeat(${rowLength}, 1fr)` }}>
                {squares.map((block) => (
                    <div
                        className="grid-block"
                        style={{ backgroundColor: block.hexColor }}
                        key={block.position}
                    >
                        {block.position}
                    </div>
                ))}
            </div>
            <button onClick={buttonHandler}>Lägg till ruta</button>
        </div>
    );
}
