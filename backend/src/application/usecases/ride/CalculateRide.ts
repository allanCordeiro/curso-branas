import Ride from "../../../ride/ride";

export default class CalculateRide {
    constructor() {}

    async execute(input: Input): Promise<Output> {    
        try {
            const ride = new Ride();
            for (const segment of input.segments) {
                ride.addSegment(segment.from[0], segment.from[1], segment.to[0], segment.to[1], new Date(segment.date));
            }
            const price = ride.calculate();		
            return { price };
        } catch(e: any) {
            throw e;            
        }
    }
}

type Input = {
    segments: {from: Array<number>, to: Array<number>, date: string}[]
}

type Output = {
    price: number;
}