import { useEffect, useState } from 'react';
import SquareDTO from '../models/squareDTO';
import { randomHexColor } from './util.jsx';
import './App.css';

function App()
{
    const [squares, setSquares] = useState([]);
    const [rowLength, setRowLength] = useState(0);

    const buttonHandler = () =>
    {
        // Since the size requirement will be linear, we can use the sqrt of the NO items combined with rounding upwards to get the needed row length in one swoop
        setRowLength(Math.ceil(Math.sqrt(squares.length + 1)));
        setSquares((prevSquares) => [...prevSquares, new SquareDTO(prevSquares.length + 1, randomHexColor())]);
    };

    return (
        <div className="main">
            <div className="grid-container" style={{ gridTemplateColumns: `repeat(${rowLength}, 1fr)` }}>
                {squares.map((square) => (
                    <div
                        className="grid-item"
                        style={{ backgroundColor: square.color }}
                        key={square.position}
                    >
                        {square.position}
                    </div>
                ))}
            </div>
            <button onClick={buttonHandler}>Lägg till ruta</button>
        </div>
    );
}

export default App;
