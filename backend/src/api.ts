import express from "express";
import { calculate } from "./ride/ride.calculator";
import Ride from "./ride/ride";
const app = express();

app.use(express.json());

app.post("/calculate_ride", function (req, res) {
	try {
		const ride = new Ride();
		for (const segment of req.body.segments) {
			ride.addSegment(segment.distance, new Date(segment.date));
		}
		const price = ride.calculate();
		res.json({ price });
	} catch (e: any) {
		res.status(422).send(e.message);
	}
});

app.listen(3000);