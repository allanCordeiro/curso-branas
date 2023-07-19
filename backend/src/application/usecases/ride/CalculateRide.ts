import Ride from "../../../domain/Ride";

export default class CalculateRide {
    constructor() {}

    async execute(input: Input): Promise<Output> {    
        try {
            const ride = new Ride();
            for (const position of input.positions) {
                ride.addPosition(position.latitude, position.longitude, new Date(position.date));
            }
            const price = ride.calculate();	
            console.log(price);	
            return { price };
        } catch(e: any) {
            throw e;            
        }
    }
}

type Input = {
    positions: {latitude: number, longitude: number, date: string}[]
}

type Output = {
    price: number;
}