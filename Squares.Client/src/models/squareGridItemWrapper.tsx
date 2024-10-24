import IGridItem from "./interface/iGridItem";

export class SquareGridItemWrapper<T> implements IGridItem {
    public object: T;
    public position: number;
    public backgroundHexColor: string;
    public cssClass: string;

    constructor(object: T, position: number, backgroundHex: string) {
        this.object = object;
        this.position = position;
        this.backgroundHexColor = backgroundHex;
        this.cssClass = "square-item-wrapper";
    }
}
