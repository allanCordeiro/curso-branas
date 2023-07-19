import Segment from "../Segment";
import OvernightFare from "./OvernightFare";
import OvernightSundayFare from "./OvernightSundayFare";
import SundayFare from "./SundayFare";

export default class FareCalculatorFactory {
    static create(segment: Segment) {
        if (segment.isOvernight() && !segment.isSunday()) {
            return new OvernightFare();
        }
        if (segment.isOvernight() && segment.isSunday()) {
            return new OvernightSundayFare();
        }
        if (!segment.isOvernight() && segment.isSunday()) {
            return new SundayFare();
        }
        if (!segment.isOvernight() && !segment.isSunday()) {
            return new SundayFare();
        }
        throw new Error("Invalid fare");
    }
}