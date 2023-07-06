import express from "express";
import Ride from "./ride/ride";
import pgp from "pg-promise";
import { HttpStatusCode } from "axios";
import Cpf from "./cpf.validator";
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

app.post("/passengers", async function (req, res) {
	try {		
		const passengerId = crypto.randomUUID();
		if(!new Cpf(req.body.document)) throw new Error("invalid cpf");
		
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into ride.passenger(id, name, email, document) values($1, $2, $3, $4)",[passengerId,
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
		const [data] = await connection.query("select id, name, email, document from ride.passenger where id = $1",[req.params.passengerId]);
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
		await connection.query("insert into ride.driver(id, name, email, document, car_plate) values($1, $2, $3, $4, $5)",[driverId,
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
		const [data] = await connection.query("select id, name, email, document, car_plate from ride.driver where id = $1",[req.params.driverId]);
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

app.listen(3000);

