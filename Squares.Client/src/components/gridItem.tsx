export default function GridItem(itemPosition: number, content: JSX.Element)
{
    // Find the sequence/corner index of the block and calculate sequence properties
    const sequenceIndex = Math.ceil(Math.sqrt(itemPosition));
    const sequenceItemLength = sequenceIndex + (sequenceIndex - 1);
    const sequenceMedian = (sequenceItemLength + 1) / 2;
    const skippedItemLength = (sequenceIndex - 1) ** 2;

    // Calculates the position relative to skipped items
    const actualSequencePosition = itemPosition - skippedItemLength;

    // Downwards pattern that bends the sequence to the left around median
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
            style={{ gridColumn: x, gridRow: y }}
            key={itemPosition}
        >
            {content}
        </div>
    );
}
