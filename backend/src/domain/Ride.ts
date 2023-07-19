import DistanceCalculator from "./DistanceCalculator";
import Position from "./Position";
import Segment from "./Segment";
import FareCalculatorFactory from "./fare/FareCalculatorFactory";

export default class Ride {
	positions: Position[];
	MIN_PRICE = 10;

	constructor () {
		this.positions = [];
	}

	addPosition(latitude: number, longitude: number, date: Date) {
		this.positions.push(new Position(latitude, longitude, date));
	}

	calculate () {
		let price = 0;
		for(const [index, position] of this.positions.entries()) {
			const nextPosition = this.positions[index + 1];
			if(!nextPosition) {
				break;
			}
			const distance = DistanceCalculator.calculate(position.coord, nextPosition.coord);
			const segment = new Segment(distance, nextPosition.date);
			const fare = FareCalculatorFactory.create(segment);
			price += fare.calculate(segment);
		}
		const factor = 10 ** 2;
		price = Math.round(price * factor) / factor;		
		return (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
	}	
}