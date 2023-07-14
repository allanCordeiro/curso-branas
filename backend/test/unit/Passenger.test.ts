import Passenger from "../../src/application/domain/Passenger"

test("Deve criar uma instancia de passageiro", function() {
    const passenger = Passenger.create("John Doe", "john.doe@gmail.com", "17422998067");
    expect(passenger.passengerId).toBeDefined();
    expect(passenger.name).toBe("John Doe");
    expect(passenger.email.value).toBe("john.doe@gmail.com");
    expect(passenger.document.value).toBe("17422998067");
})

test("Deve gerar erro caso cpf seja inválido", function() {
    expect(() => Passenger.create("John Doe", "john.doe@gmail.com", "17422998065")).toThrow(new Error("invalid cpf"));    
})

test("Deve gerar erro caso email seja inválido", function() {
    expect(() => Passenger.create("John Doe", "john.doeATgmail.com", "17422998067")).toThrow(new Error("Invalid email"));    
})