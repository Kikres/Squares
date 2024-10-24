export default function Block({ backgroundColorHex }: { backgroundColorHex: string })
{
    // The block component represents the fact any component can be rendered in the grid :)
    return (
        <div className="block" style={{ backgroundColor: backgroundColorHex }}></div>
  );
}

