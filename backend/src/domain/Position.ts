import Coordinate from "./Coordinate"

export default class Position {
    coord: Coordinate;

    constructor(latitude: number, longitude: number, readonly date: Date) {
        this.coord = new Coordinate(latitude, longitude);
    }
}