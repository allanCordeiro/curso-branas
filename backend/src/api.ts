import express from "express";
import Ride from "./ride/ride";
import pgp from "pg-promise";
import { HttpStatusCode } from "axios";
import Cpf from "./cpf.validator";
import date from 'date-and-time';
const app = express();

app.use(express.json());

app.post("/calculate_ride", function (req, res) {
	try {
		const ride = new Ride();
		for (const segment of req.body.segments) {
			ride.addSegment(segment.from[0], segment.from[1], segment.to[0], segment.to[1], new Date(segment.date));
		}
		const price = ride.calculate();
		res.json({ price });
	} catch (e: any) {
		res.status(422).send(e.message);
	}
});

app.post("/passengers", async function (req, res) {
	try {		
		const passengerId = crypto.randomUUID();
		if(!new Cpf(req.body.document)) throw new Error("invalid cpf");
		
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into lift.passenger(id, name, email, document) values($1, $2, $3, $4)",[passengerId,
			 req.body.name,
			req.body.email,
			req.body.document
		]);
		await connection.$pool.end();
		res.json({ passengerId });
	} catch(e: any) {
		res.status(HttpStatusCode.UnprocessableEntity).send(e.message);
	}
})

app.get("/passengers/:passengerId", async function (req, res) {
	try {		
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [data] = await connection.query("select id, name, email, document from lift.passenger where id = $1",[req.params.passengerId]);
		await connection.$pool.end();
		res.json(data);
	} catch(e: any) {
		res.status(HttpStatusCode.InternalServerError).send(e.message);
	}
})

app.post("/drivers", async function (req, res) {
	try {		
		const driverId = crypto.randomUUID();
		if(!new Cpf(req.body.document)) throw new Error("invalid cpf");
		
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into lift.driver(id, name, email, document, car_plate) values($1, $2, $3, $4, $5)",[driverId,
			req.body.name,
			req.body.email,
			req.body.document,
			req.body.carPlate
		]);
		await connection.$pool.end();
		res.json({ driverId });
	} catch(e: any) {
		res.status(HttpStatusCode.UnprocessableEntity).send(e.message);
	}
})

app.get("/drivers/:driverId", async function (req, res) {
	try {		
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [data] = await connection.query("select id, name, email, document, car_plate from lift.driver where id = $1",[req.params.driverId]);
		await connection.$pool.end();
		res.json({
			driverId: data.driverId,
			name: data.name,
			email: data.email,
			document: data.document,
			carPlate: data.car_plate
		});
	} catch(e: any) {
		res.status(HttpStatusCode.InternalServerError).send(e.message);
	}
})

app.post("/request_ride", async function (req, res) {
	try {
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const rideId = crypto.randomUUID();
		const currentDate = new Date();
		await connection.query("insert into lift.ride(id, passenger_id, driver_id, status, segment_id, request_date, accept_date) values($1, $2, $3, $4, $5, $6, $7)",[rideId,
			req.body.passanger_id,
			null,
			'waiting_driver',
			'f2e993ce-bf25-400c-b7be-52b25f6d1ce4', //fixme: temporary
			date.format(currentDate, 'YYYY-MM-DD HH:mm:ss'),
			null
		]);
		await connection.$pool.end();
		res.json({ rideId });
	} catch(e: any) {		
		res.status(HttpStatusCode.UnprocessableEntity).send(e.message);
	}
})

app.get("/rides/:rideId", async function (req, res) {
	try {		
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [data] = await connection.query("select id, passenger_id, driver_id, status, request_date from lift.ride where id = $1",[req.params.rideId]);
		await connection.$pool.end();
		let waitingTime = Date.now() - data.request_date;
		waitingTime = Math.round(waitingTime/60000);
		res.json({
			id: data.driverId,
			passengerId: data.passanger_id,
			driverId: data.driver_id,
			status: data.status,
			waiting: waitingTime,
		});
	} catch(e: any) {
		res.status(HttpStatusCode.InternalServerError).send(e.message);
	}
})


app.listen(3000);

