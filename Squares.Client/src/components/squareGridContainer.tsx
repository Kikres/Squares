import IGridItem from "../models/interface/iGridItem";
import gridItem from "./gridItem";

export default function squareGridContainer(itemArray: IGridItem[])
{
    const gridLength: number = Math.ceil(Math.sqrt(itemArray.length));

    return (
        <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridLength}, 1fr)`, gridTemplateRows: `repeat(${gridLength}, 1fr)`}}>
            {itemArray.map((item) => (
                gridItem(gridLength, item)
            ))}
        </div>
    );
}

