import { useEffect, useState } from 'react';
import { clearBlockAsync, getBlockAsync, postBlockAsync } from './api';
import { randomHexColor } from './util';
import SquareGridContainer from './components/SquareGridContainer';
import BlockDto from './models/BlockDto';
import Block from './components/Block';

export default function App()
{
    const [squares, setSquares] = useState<BlockDto[]>([]);
    const orderedElementArray = squares.map((block) => (<Block backgroundColorHex={block.hexColor} />));

    const fetchData = async () =>
    {
        try
        {
            const squareArray = await getBlockAsync();
            setSquares(squareArray);
        } catch (error)
        {
            const retryAfter = 2; // Retry delay in seconds
            console.log(`Retry in: ${retryAfter} seconds`);
            setTimeout(fetchData, retryAfter * 1000);
        }
    };

    // Fetch data on component mount
    useEffect(() =>
    {
        fetchData();
    }, []);

    const addButtonHandler = async () =>
    {
        let hexColor = '';
        while (squares[squares.length - 1]?.hexColor === hexColor || hexColor === '')
        {
            hexColor = randomHexColor();
        }

        await postBlockAsync(new BlockDto(squares.length + 1, hexColor));
        fetchData(); // Refresh data to update the grid
    };

    const clearButtonHandler = async () =>
    {
        await clearBlockAsync();
        fetchData(); // Refresh data to render an empty grid
    };

    return (
        <div className="main">
            <div className="button-container">
                <button onClick={addButtonHandler}>Lägg till ruta</button>
                <button onClick={clearButtonHandler}>Rensa</button>
            </div>
            <SquareGridContainer orderedElementArray={orderedElementArray} />
        </div>
    );
}
