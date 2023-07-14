import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
};

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
	const input = {
		segments: [
			{ from:  [-23.5850, -46.6060], to: [-23.5346, -46.6523], date: "2021-03-01T10:00:00" }
		]
	};
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	const output = response.data;	
	expect(output.price).toBe(15.39);
});

test("Se a distância for inválida deve lançar um erro", async function () {
	const input = {
		segments: [
			{ from:  [-1.00, -1.00], to: [-1.00, -1.00], date: "2021-03-01T10:00:00" }
		]
	};
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("Invalid distance");
});


test("Deve cadastrar o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982050"
	};
	const responseCreatePassenger = await axios.post("http://localhost:3000/passengers", input);
	const outputCreatePassenger = responseCreatePassenger.data;
	expect(outputCreatePassenger.passengerId).toBeDefined();
});

test("Não deve cadastrar o passageiro quando cpf for invalido", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982052"
	};
	const response = await axios.post("http://localhost:3000/passengers", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("invalid cpf");	
});

test("Deve obter o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982050"
	};
	const responseCreatePassenger = await axios.post("http://localhost:3000/passengers", input);
	const outputCreatePassenger = responseCreatePassenger.data;
	expect(outputCreatePassenger.passengerId).toBeDefined();
	const responseGetPassenger = await axios.get(`http://localhost:3000/passengers/${outputCreatePassenger.passengerId}`);
	const output = responseGetPassenger.data;		
	expect(output.name).toBe("John Doe");
	expect(output.email).toBe("john.doe@gmail.com");
	expect(output.document).toBe("86141982050");
});



test("Deve cadastrar o motorista", async function () {
	const input = {
		name: "Jane Doe",
		email: "jane.doe@gmail.com",
		document: "86141982050",
		carPlate: "AAA9999"
	};
	const responseCreateDriver = await axios.post("http://localhost:3000/drivers", input);
	const outputCreateDriver = responseCreateDriver.data;
	expect(outputCreateDriver.driverId).toBeDefined();
});

test("Não deve cadastrar o motorista quando cpf for invalido", async function () {
	const input = {
		name: "Jane Doe",
		email: "jane.doe@gmail.com",
		document: "86141982052",
		carPlate: "AAA9999"
	};
	const response = await axios.post("http://localhost:3000/drivers", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("invalid cpf");	
});

test("Deve obter o motorista", async function () {
	const input = {
		name: "Jane Doe",
		email: "jane.doe@gmail.com",
		document: "86141982050",
		carPlate: "AAA9999"
	};
	const responseCreateDriver = await axios.post("http://localhost:3000/drivers", input);
	const outputCreateDriver = responseCreateDriver.data;
	expect(outputCreateDriver.driverId).toBeDefined();
	const responseGetDriver = await axios.get(`http://localhost:3000/drivers/${outputCreateDriver.driverId}`);
	const output = responseGetDriver.data;		
	expect(output.name).toBe("Jane Doe");
	expect(output.email).toBe("jane.doe@gmail.com");
	expect(output.document).toBe("86141982050");
	expect(output.carPlate).toBe("AAA9999");
});

test("Deve criar uma ride", async function () {
	const input = {
		"passenger_id": "9e96d2b4-6a85-4667-b33c-823c1cfb82c5",
		"from": [-23.5850, -46.6060],
		"to": [-23.5346, -46.6523]
	};

	const responseCreateRide = await axios.post("http://localhost:3000/request_ride", input);
	const outputCreateRide = responseCreateRide.data;
	expect(outputCreateRide.rideId).toBeDefined();

	const getRide = await axios.get(`http://localhost:3000/rides/${outputCreateRide.rideId}`);
	const output = getRide.data;
	expect(output.status).toBe("waiting_driver");
});

test("Deve obter uma ride", async function () {
	const input = {
		"passenger_id": "9e96d2b4-6a85-4667-b33c-823c1cfb82c5",
		"from": [-23.5850, -46.6060],
		"to": [-23.5346, -46.6523]
	};

	const responseCreateRide = await axios.post("http://localhost:3000/request_ride", input);
	const outputCreateRide = responseCreateRide.data;
	expect(outputCreateRide.rideId).toBeDefined();

	const getRide = await axios.get(`http://localhost:3000/rides/${outputCreateRide.rideId}`);
	const output = getRide.data;
	expect(output.passenger).toBeDefined();
	expect(output.driver.name).toBeNull();
	expect(output.driver.document).toBeNull();
	expect(output.driver.carPlate).toBeNull();
	expect(output.status).toBe("waiting_driver");
});

test("Deve aceitar uma ride", async function () {
	const input = {
		"passenger_id": "9e96d2b4-6a85-4667-b33c-823c1cfb82c5",
		"from": [-23.5850, -46.6060],
		"to": [-23.5346, -46.6523]
	};

	const responseCreateRide = await axios.post("http://localhost:3000/request_ride", input);
	const outputCreateRide = responseCreateRide.data;
	expect(outputCreateRide.rideId).toBeDefined();

	const acceptInput = {
		"ride_id": outputCreateRide.rideId,
		"driver_id": "8320d38c-e066-43b8-9ecb-29122f04e0c8"
	};

	const acceptRide = await axios.post("http://localhost:3000/accept_ride", acceptInput);

	const getRide = await axios.get(`http://localhost:3000/rides/${outputCreateRide.rideId}`);
	const output = getRide.data;
	expect(output.passenger).toBeDefined();
	expect(output.driver).toBeDefined();
	expect(output.status).toBe("accepted");
});