import Segment from "./segment";

export default class Ride {
	segments: Segment[];
	OVERNIGHT_FARE = 3.90;
	OVERNIGHT_SUNDAY_FARE = 5;
	SUNDAY_FARE = 2.9;
	NORMAL_FARE = 2.1;
	MIN_PRICE = 10;

	constructor () {
		this.segments = [];
	}

	addSegment (latPointA: number, longPointA: number, latPointB: number, longPointB: number, date: Date) {
		this.segments.push(new Segment(latPointA, longPointA, latPointB, longPointB, date));
	}

	calculate () {
		let price = 0;
		for (const segment of this.segments) {
			if (segment.isOvernight() && !segment.isSunday()) {
				price += segment.distance * this.OVERNIGHT_FARE;
			}
			if (segment.isOvernight() && segment.isSunday()) {
				price += segment.distance * this.OVERNIGHT_SUNDAY_FARE;
			}
			if (!segment.isOvernight() && segment.isSunday()) {
				price += segment.distance * this.SUNDAY_FARE;
			}
			if (!segment.isOvernight() && !segment.isSunday()) {
				price += segment.distance * this.NORMAL_FARE;
			}
		}
		const factor = 10 ** 2;
		price = Math.round(price * factor) / factor;
		
		return (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
	}
}