import CarPlate from "../../src/application/domain/CarPlate"

test("Deve validar uma placa de carro", function() {
    const carPlate = new CarPlate("AAA1234");
    expect(carPlate.value).toBe("AAA1234");
})

test("Deve enviare erro em uma placa de carro inválida", function() {
    expect(() => new CarPlate("AAA123456")).toThrow(new Error("Invalid car plate"));
})