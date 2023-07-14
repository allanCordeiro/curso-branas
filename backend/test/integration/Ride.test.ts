import CreatePassenger from "../../src/application/usecases/passenger/CreatePassenger";
import AcceptRide from "../../src/application/usecases/ride/AcceptRide";
import CalculateRide from "../../src/application/usecases/ride/CalculateRide";
import GetRide from "../../src/application/usecases/ride/GetRide";
import RequestRide from "../../src/application/usecases/ride/RequestRide";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";

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

test("Deve criar uma nova ride", async function () {
    const passenger = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982050"
	};
	const usecasePassenger = new CreatePassenger(new PassengerRepositoryDatabase());
    const outputPassenger = await usecasePassenger.execute(passenger);

    const input = {
        "passengerId": outputPassenger.passengerId,
        "from": [-23.5850, -46.6060],
        "to": [-23.5346, -46.6523]
    }

    const usecase = await new RequestRide();
    const output = usecase.execute(input);
    expect(output).toBeDefined();
});

test("Deve obter uma ride", async function () {
    const passenger = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982050"
	};
	const usecasePassenger = new CreatePassenger(new PassengerRepositoryDatabase());
    const outputPassenger = await usecasePassenger.execute(passenger);
    const input = {
        "passengerId": outputPassenger.passengerId,
        "from": [-23.5850, -46.6060],
        "to": [-23.5346, -46.6523]
    }

    const usecaseCreate = new RequestRide();
    const outputCreate = await usecaseCreate.execute(input);
    expect(outputCreate).toBeDefined();

    const usecase = new GetRide();
    const output = await usecase.execute({rideId: outputCreate.rideId});
    expect(output.driver.carPlate).toBeNull();
    expect(output.driver.document).toBeNull();
    expect(output.driver.name).toBeNull();
    expect(output.passenger.document).toBeDefined();
    expect(output.passenger.name).toBeDefined();
    expect(output.status).toBe("waiting_driver");
    expect(output.waitingMinutes).toBeDefined();
});

test("Deve aceitar uma ride", async function () {
    const passenger = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982050"
	};
	const usecasePassenger = new CreatePassenger(new PassengerRepositoryDatabase());
    const outputPassenger = await usecasePassenger.execute(passenger);

    const input = {
        "passengerId": outputPassenger.passengerId,
        "from": [-23.5850, -46.6060],
        "to": [-23.5346, -46.6523]
    }

    const usecaseCreate = new RequestRide();
    const outputCreate = await usecaseCreate.execute(input);
    expect(outputCreate).toBeDefined();

    const usecaseAccept = new AcceptRide();
    const outputAccept = await usecaseAccept.execute({rideId: outputCreate.rideId, driverId: "4500bde5-f580-443a-9479-3eaedaf62d65"});

    
    const usecase = new GetRide();
    const output = await usecase.execute({rideId: outputCreate.rideId});
    expect(output.driver.carPlate).toBeDefined();
    expect(output.driver.document).toBeDefined();
    expect(output.driver.name).toBeDefined();
    expect(output.passenger.document).toBeDefined();
    expect(output.passenger.name).toBeDefined();
    expect(output.status).toBe("accepted");
    expect(output.waitingMinutes).toBeDefined();
});