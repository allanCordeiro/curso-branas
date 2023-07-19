import Segment from "../Segment";
import FareCalculator from "./FareCalculator";

export default class OvernightSundayFare implements FareCalculator {
    FARE = 5;
    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }    
}