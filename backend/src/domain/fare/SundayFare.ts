import Segment from "../Segment";
import FareCalculator from "./FareCalculator";

export default class SundayFare implements FareCalculator {
    FARE = 2.9;
    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }    
}