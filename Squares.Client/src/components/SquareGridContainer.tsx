import GridItem from "./GridItem";

export default function SquareGridContainer({ orderedElementArray }: { orderedElementArray: JSX.Element[] })
{
    const gridLength: number = Math.ceil(Math.sqrt(orderedElementArray.length));
    return (
        <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridLength}, 1fr)`, gridTemplateRows: `repeat(${gridLength}, 1fr)`}}>
            {orderedElementArray.map((element, index) => (
                GridItem(index + 1, element)
            ))}
        </div>
    );
}

