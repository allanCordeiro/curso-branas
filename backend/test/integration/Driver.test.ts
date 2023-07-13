import CreateDriver from "../../src/application/usecases/Driver/CreateDriver";
import GetDriver from "../../src/application/usecases/Driver/GetDriver";

test("Deve cadastrar o motorista", async function () {
	const input = {
		name: "Jane Doe",
		email: "jane.doe@gmail.com",
		document: "86141982050",
		carPlate: "AAA9999"
	};
	const usecase = new CreateDriver();
    const output = await usecase.execute(input);
	expect(output.driverId).toBeDefined();
});

test("Não deve cadastrar o motorista quando cpf for invalido", async function () {
	const input = {
		name: "Jane Doe",
		email: "jane.doe@gmail.com",
		document: "86141982052",
		carPlate: "AAA9999"
	};
	const usecase = new CreateDriver();
    expect(async () => await usecase.execute(input)).rejects.toThrow(new Error("invalid cpf"));	
});

test("Deve obter o motorista", async function () {
    const input = {
		name: "Jane Doe",
		email: "jane.doe@gmail.com",
		document: "86141982050",
		carPlate: "AAA9999"
	};
	const usecaseCreate = new CreateDriver();
    const outputCreate = await usecaseCreate.execute(input);
	expect(outputCreate.driverId).toBeDefined();

    const usecase = new GetDriver();
    const output = await usecase.execute({driverId:outputCreate.driverId});
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.document).toBe(input.document);
    expect(output.carPlate).toBe(input.carPlate);
});