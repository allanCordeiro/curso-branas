import Segment from "../Segment";
import FareCalculator from "./FareCalculator";

export default class NormalFare implements FareCalculator {
    FARE = 2.1;
    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }    
}