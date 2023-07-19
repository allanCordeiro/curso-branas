
import Ride from "../../src/domain/Ride";


test("Deve fazer o cálculo do preço de uma corrida durante o dia", function () {
	const ride = new Ride();
	ride.addPosition(-23.5850, -46.6060, new Date("2021-03-01T10:00:00"));
	ride.addPosition(-23.5346, -46.6523, new Date("2021-03-01T10:00:00"))
	expect(ride.calculate()).toBe(20.3);
});

test("Deve fazer o cálculo do preço de uma corrida durante a noite", function () {
	const ride = new Ride();
	ride.addPosition(-23.5850, -46.6060, new Date("2021-03-01T23:00:00"));
	ride.addPosition(-23.5346, -46.6523, new Date("2021-03-01T23:00:00"))	
	expect(ride.calculate()).toBe(27.3);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de dia", function () {
	const ride = new Ride();
	ride.addPosition(-23.5850, -46.6060, new Date("2021-03-07T10:00:00"));
	ride.addPosition(-23.5346, -46.6523, new Date("2021-03-07T10:00:00"))		
	expect(ride.calculate()).toBe(20.3);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de noite", function () {
	const ride = new Ride();
	ride.addPosition(-23.5850, -46.6060, new Date("2021-03-07T23:00:00"));
	ride.addPosition(-23.5346, -46.6523, new Date("2021-03-07T23:00:00"))	
	expect(ride.calculate()).toBe(35);
});

test("Deve retornar erro se a distância for inválida", function () {
	const ride = new Ride();
	ride.addPosition(-1.00, -1.00, new Date("2021-03-07T23:00:00"));
	ride.addPosition(-1.00, -1.00, new Date("2021-03-07T23:00:00"))	
	expect(() => ride.calculate()).toThrow(new Error("Invalid distance"));
});

test("Deve retornar erro se a data for inválida", function () {
	const ride = new Ride();
	ride.addPosition(-23.5346, -46.6523, new Date("2021-03-07T23:00:00"));
	ride.addPosition(-23.5850, -46.6060, new Date("javascript"));
	expect(() => ride.calculate()).toThrow(new Error("Invalid date"));
});

test("Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo", function () {
	const ride = new Ride();
	ride.addPosition(-23.5348141,-46.651865, new Date("2021-03-01T10:00:00"));
	ride.addPosition(-23.5338095,-46.6468842, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(10);
});

