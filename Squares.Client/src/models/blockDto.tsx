export default class BlockDto {
    position: number;
    hexColor: string;
    constructor(position: number, hexColor: string) {
        this.position = position;
        this.hexColor = hexColor;
    }
}