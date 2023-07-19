import Segment from "../Segment";
import FareCalculator from "./FareCalculator";

export default class OvernightFare implements FareCalculator {
    FARE = 3.90;
    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }    
}