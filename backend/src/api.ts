import express from "express";
import pgp from "pg-promise";
import { HttpStatusCode } from "axios";
import date from 'date-and-time';
import CalculateRide from "./application/usecases/ride/CalculateRide";
import CreatePassenger from "./application/usecases/Passenger/CreatePassenger";
import GetPassenger from "./application/usecases/Passenger/GetPassenger";
import CreateDriver from "./application/usecases/Driver/CreateDriver";
import GetDriver from "./application/usecases/Driver/GetDriver";

const app = express();
app.use(express.json());

app.post("/calculate_ride", async function (req, res) {
	try {
		const usecase = new CalculateRide();
		const output = await usecase.execute({ segments: req.body.segments})
		res.json(output);
	} catch (e: any) {
		res.status(422).send(e.message);
	}
});

app.post("/passengers", async function (req, res) {
	try {				
		const useCase = new CreatePassenger();
		const output = await useCase.execute({name: req.body.name, email: req.body.email, document: req.body.document});		
		res.json(output);
	} catch(e: any) {
		res.status(HttpStatusCode.UnprocessableEntity).send(e.message);
	}
})

app.get("/passengers/:passengerId", async function (req, res) {
	try {		
		const useCase = new GetPassenger();
		const output = await useCase.execute({ passengerId: req.params.passengerId });
		res.json(output);
	} catch(e: any) {
		res.status(HttpStatusCode.InternalServerError).send(e.message);
	}
})

app.post("/drivers", async function (req, res) {
	try {		
		const useCase = new CreateDriver();
		const output = await useCase.execute({ name: req.body.name, email: req.body.email, document: req.body.document, carPlate: req.body.carPlate});
		res.json(output);
	} catch(e: any) {
		res.status(HttpStatusCode.UnprocessableEntity).send(e.message);
	}
})

app.get("/drivers/:driverId", async function (req, res) {
	try {		
		const useCase = new GetDriver();
		const output = await useCase.execute({driverId: req.params.driverId})
		res.json(output);
	} catch(e: any) {
		res.status(HttpStatusCode.InternalServerError).send(e.message);
	}
})

app.post("/request_ride", async function (req, res) {
	try {
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const currentDate = new Date();

		const segmentId = crypto.randomUUID();
		await connection.query("insert into lift.segment(id, lat_from, long_from, lat_to, long_to, ride_time) values($1, $2, $3, $4, $5, $6)", [segmentId,
			req.body.from[0],
			req.body.from[1],
			req.body.to[0],
			req.body.to[1],
			date.format(currentDate, 'HH:mm:ss')
		]);

		const rideId = crypto.randomUUID();		
		await connection.query("insert into lift.ride(id, passenger_id, driver_id, status, segment_id, request_date, accept_date) values($1, $2, $3, $4, $5, $6, $7)",[rideId,
			req.body.passenger_id,
			null,
			'waiting_driver',
			segmentId,
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
		const [data] = await connection.query("select r.id, p.name as pname, p.document as pdoc, d.name as dname, d.document as ddoc, d.car_plate, r.status, r.request_date from lift.ride r inner join lift.passenger p on p.id = r.passenger_id left join lift.driver d on d.id = r.driver_id where r.id = $1",[req.params.rideId]);
		if (!data) throw new Error("data not found");
		
		await connection.$pool.end();
		let waitingTime = Date.now() - data.request_date;
		waitingTime = Math.round(waitingTime/60000);
		res.json({
			id: data.driverId,
			passenger: {				
				name: data.pname,
				document: data.pdoc
			},
			driver: {
				name: data.dname,
				document: data.ddoc,
				carPlate: data.car_plate
			}, 
			status: data.status,
			waitingMinutes: waitingTime,
		});
	} catch(e: any) {
		res.status(HttpStatusCode.NotFound).send(e.message);
	}
})

app.post("/accept_ride", async function (req, res) {
	try {
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const currentDate = new Date();
		await connection.query("update lift.ride set driver_id = $2, status = $3, accept_date = $4 where id = $1",[req.body.ride_id,
			req.body.driver_id,
			'accepted',
			date.format(currentDate, 'YYYY-MM-DD HH:mm:ss'),			
		]);
		await connection.$pool.end();
		
		res.json();

	} catch(e: any) {
		res.status(HttpStatusCode.NotFound).send(e.message);
	}
})

app.listen(3000);

