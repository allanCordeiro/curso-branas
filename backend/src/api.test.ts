import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
};

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
	const input = {
		segments: [
			{ distance: 10, date: "2021-03-01T10:00:00" }
		]
	};
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	const output = response.data;
	expect(output.price).toBe(21);
});

test("Se a distância for inválida deve lançar um erro", async function () {
	const input = {
		segments: [
			{ distance: -10, date: "2021-03-01T10:00:00" }
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