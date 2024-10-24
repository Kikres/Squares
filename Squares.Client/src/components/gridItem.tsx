import IGridItem from "../models/interface/iGridItem";

export default function gridItem(gridLength: number, item: IGridItem) {
    // Find the corner index of the block
    const sequenceIndex = Math.ceil(Math.sqrt(item.position));
    const sequenceItemLength = sequenceIndex + (sequenceIndex - 1);
    const sequenceMedian = (sequenceItemLength + 1) / 2;
    const skippedItemLength = (sequenceIndex - 1) ** 2;

    // Calculates the position relative to skipped items, bends the sequence to the left around median
    const actualSequencePosition = item.position - skippedItemLength;

    let x = sequenceMedian;
    let y = sequenceMedian;

    if (sequenceMedian != 0 && actualSequencePosition > sequenceMedian) {
        x = sequenceItemLength - actualSequencePosition + 1;
    }
    if (sequenceMedian != 0 && actualSequencePosition < sequenceMedian) {
        y = actualSequencePosition;
    }

    return (
        <div
            className={item.cssClass}
            style={{ gridColumn: x, gridRow: y, backgroundColor: item.backgroundHexColor }}
            key={item.position}
        >
        </div>
    );
}
