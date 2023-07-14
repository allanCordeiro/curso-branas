export default class Segment {
	EARTH_RADIUS = 6371; // Raio médio da Terra em quilômetros
	private _distance;
	constructor (readonly latPointA: number, readonly longPointA: number, readonly latPointB: number, readonly longPointB: number, readonly date: Date) {
		this._distance = this.calculateDistance(latPointA, longPointA, latPointB, longPointB);

		if (!this.isValidDistance()) throw new Error("Invalid distance");
		if (!this.isValidDate()) throw new Error("Invalid date");
	}

	get distance(): number {
		const factor = 10 ** 2;
		return Math.round(this._distance * factor) / factor;
	}
	
	isOvernight () {
		return this.date.getHours() >= 22 || this.date.getHours() <= 6;
	}
	
	isSunday () {
		return this.date.getDay() === 0;
	}
	
	isValidDistance () {
		return this.distance && typeof this.distance === "number" && this.distance > 0;
	}
	
	isValidDate () {
		return this.date && this.date instanceof Date && this.date.toString() !== "Invalid Date";
	}

	calculateDistance(latPointA: number, longPointA: number, latPointB: number, longPointB: number): number {			  	
		const radius = Math.PI / 180;			  		
		const deltaLat = (latPointB * radius) - (latPointA * radius);
		const deltaLon = (longPointB * radius) - (longPointA * radius);
	  
		//Haversine
		const a =
		  Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		  Math.cos(latPointA * radius) * Math.cos((latPointB * radius)) *
		  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  		
		return this.EARTH_RADIUS * c;		
	  }
}