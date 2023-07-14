import express from "express";
import { HttpStatusCode } from "axios";
import CalculateRide from "./application/usecases/ride/CalculateRide";
import CreatePassenger from "./application/usecases/passenger/CreatePassenger";
import GetPassenger from "./application/usecases/passenger/GetPassenger";
import CreateDriver from "./application/usecases/driver/CreateDriver";
import GetDriver from "./application/usecases/driver/GetDriver";
import RequestRide from "./application/usecases/ride/RequestRide";
import GetRide from "./application/usecases/ride/GetRide";
import AcceptRide from "./application/usecases/ride/AcceptRide";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";

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
		const useCase = new CreatePassenger(new PassengerRepositoryDatabase());
		const output = await useCase.execute({name: req.body.name, email: req.body.email, document: req.body.document});		
		res.json(output);
	} catch(e: any) {
		res.status(HttpStatusCode.UnprocessableEntity).send(e.message);
	}
})

app.get("/passengers/:passengerId", async function (req, res) {
	try {		
		const useCase = new GetPassenger(new PassengerRepositoryDatabase());
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
		const usecase = new RequestRide();
		const output = await usecase.execute({passengerId: req.body.passenger_id, from: req.body.from, to: req.body.to})
		res.json(output);
	} catch(e: any) {		
		res.status(HttpStatusCode.UnprocessableEntity).send(e.message);
	}
})

app.get("/rides/:rideId", async function (req, res) {
	try {		
		const usecase = new GetRide();
		const output = await usecase.execute({rideId: req.params.rideId})
		res.json(output);
	} catch(e: any) {
		res.status(HttpStatusCode.NotFound).send(e.message);
	}
})

app.post("/accept_ride", async function (req, res) {
	try {
		const usecase = new AcceptRide();
		await usecase.execute({rideId: req.body.ride_id, driverId: req.body.driver_id});
		
		res.json();

	} catch(e: any) {
		res.status(HttpStatusCode.NotFound).send(e.message);
	}
})

app.listen(3000);

