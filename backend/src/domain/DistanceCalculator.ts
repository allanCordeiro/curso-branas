import Coordinate from "./Coordinate";

export default class DistanceCalculator {
    
	static calculate(from: Coordinate, to: Coordinate): number {			  	
        const earthRadius = 6371; // Raio médio da Terra em quilômetros
		const radius = Math.PI / 180;			  		
		const deltaLat = (to.latitude * radius) - (from.latitude * radius);
		const deltaLon = (to.longitude * radius) - (from.longitude * radius);
	  
		//Haversine
		const a =
		  Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		  Math.cos(from.latitude * radius) * Math.cos((to.latitude * radius)) *
		  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c		
		return Math.round(distance);		
	  }
}