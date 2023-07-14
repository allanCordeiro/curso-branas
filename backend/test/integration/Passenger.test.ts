import CreatePassenger from "../../src/application/usecases/passenger/CreatePassenger";
import GetPassenger from "../../src/application/usecases/passenger/GetPassenger";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";

test("Deve cadastrar o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982050"
	};
	const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
    const output = await usecase.execute(input);

	expect(output.passengerId).toBeDefined();
});

test("Não deve cadastrar o passageiro quando cpf for invalido", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982052"
	};
	const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
	expect(async () => await usecase.execute(input)).rejects.toThrow(new Error("Invalid cpf"));	
});

test("Deve obter o passageiro", async function() {
    const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "86141982050"
	};
	const usecaseCreate = new CreatePassenger(new PassengerRepositoryDatabase());
    const outputCreate = await usecaseCreate.execute(input);

	expect(outputCreate.passengerId).toBeDefined();

    const usecase = new GetPassenger(new PassengerRepositoryDatabase());
    const output = await usecase.execute({passengerId: outputCreate.passengerId });	
    expect(output.document).toBe(input.document)
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
});