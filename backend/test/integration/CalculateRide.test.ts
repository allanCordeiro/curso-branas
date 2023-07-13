import CalculateRide from "../../src/application/usecases/ride/CalculateRide";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
	const input = {
		segments: [
			{ from:  [-23.5850, -46.6060], to: [-23.5346, -46.6523], date: "2021-03-01T10:00:00" }
		]
	};
    const expectedPrice = 15.39;

	const useCase = new CalculateRide();
    const output = await useCase.execute(input);	
	expect(output.price).toBe(expectedPrice);
});


test("Deve fazer o cálculo do preço de uma corrida durante o dia com multiplos segmentos", async function () {
	const input = {
		segments: [
			{ from:  [-23.5850, -46.6060], to: [-23.5346, -46.6523], date: "2021-03-01T10:00:00" },
            { from:  [-23.1850, -46.7060], to: [-23.5336, -46.6533], date: "2021-03-01T10:00:00" },
            { from:  [-23.5855, -46.6065], to: [-23.5375, -46.6524], date: "2021-03-01T10:00:00" },
		]
	};
    const expectedPrice = 112.48;

	const useCase = new CalculateRide();
    const output = await useCase.execute(input);	
	expect(output.price).toBe(expectedPrice);
});

test("Se a distância for inválida deve lançar um erro", async function () {
	const input = {
		segments: [
			{ from:  [-1.00, -1.00], to: [-1.00, -1.00], date: "2021-03-01T10:00:00" }
		]
	};
    const useCase = new CalculateRide();
    expect(async () => await useCase.execute(input)).rejects.toThrow(new Error("Invalid distance"));
});