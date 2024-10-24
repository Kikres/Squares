import { useEffect, useState } from 'react';
import { clearBlockAsync, getBlockAsync, postBlockAsync } from './api.jsx';
import { randomHexColor } from './util.jsx';
import squareGridContainer from './components/squareGridContainer.jsx';
import { SquareGridItemWrapper } from "./models/squareGridItemWrapper.jsx";
import BlockDto from './models/blockDto.jsx';

export default function app()
{
    const [squares, setSquares] = useState<SquareGridItemWrapper<BlockDto>[]>([]);

    const fetchData = async () =>
    {
        try
        {
            const squareArray = await getBlockAsync();
            setSquares(squareArray.map(x => new SquareGridItemWrapper<BlockDto>(x, x.position, x.hexColor)));

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

    const addButtonHandler = async () =>
    {
        // Guard against generating the same color twice in a row
        let backgroundHexColor = "";
        while (squares[squares.length - 1]?.backgroundHexColor === backgroundHexColor || backgroundHexColor === "")
        {
            backgroundHexColor = randomHexColor();
        }

        await postBlockAsync(new BlockDto(squares.length + 1, backgroundHexColor));

        // Refresh data to render updated grid
        fetchData();
    }

    const clearButtonHandler = async () =>
    {
        await clearBlockAsync();

        // Refresh data to render the empty grid
        fetchData();
    };

    return (
        <div className="main">
            <div>
                <button onClick={addButtonHandler}>Lägg till ruta</button>
                <button onClick={clearButtonHandler}>Rensa</button>
            </div>
            {squareGridContainer(squares)}
        </div>
    );
}