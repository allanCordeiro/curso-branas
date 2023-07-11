
import Ride from "../../src/ride/ride";
import { calculate } from "../../src/ride/ride.calculator";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", function () {
	const ride = new Ride();
	ride.addSegment(-23.5850, -46.6060, -23.5346, -46.6523, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(15.39);
});

test("Deve fazer o cálculo do preço de uma corrida durante a noite", function () {
	const ride = new Ride();
	ride.addSegment(-23.5850, -46.6060, -23.5346, -46.6523, new Date("2021-03-01T23:00:00"));
	expect(ride.calculate()).toBe(28.59);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de dia", function () {
	const ride = new Ride();
	ride.addSegment(-23.5850, -46.6060, -23.5346, -46.6523, new Date("2021-03-07T10:00:00"));
	expect(ride.calculate()).toBe(21.26);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de noite", function () {
	const ride = new Ride();
	ride.addSegment(-23.5850, -46.6060, -23.5346, -46.6523, new Date("2021-03-07T23:00:00"));
	expect(ride.calculate()).toBe(36.65);
});

test("Deve retornar erro se a distância for inválida", function () {
	const ride = new Ride();
	expect(() => ride.addSegment(-1.00, -1.00, -1.00, -1.00, new Date("2023-03-01T10:00:00"))).toThrow(new Error("Invalid distance"));
});

test("Deve retornar erro se a data for inválida", function () {
	const ride = new Ride();
	expect(() => ride.addSegment(-23.5850, -46.6060, -23.5346, -46.6523, new Date("javascript"))).toThrow(new Error("Invalid date"));
});

test("Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo", function () {
	const ride = new Ride();
	ride.addSegment(-23.560900, -46.662012, -23.561029, -46.661792, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(10);
});

test("Deve fazer o cálculo do preço de uma corrida com múltiplos segmentos", function () {
	const ride = new Ride();
	ride.addSegment(-23.5850, -46.6060, -23.5346, -46.6523, new Date("2021-03-01T10:00:00"));
	ride.addSegment(-23.5850, -46.6060, -23.5346, -46.6523, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(30.79);
});