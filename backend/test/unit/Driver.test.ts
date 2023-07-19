import Driver from "../../src/domain/Driver";

test("Deve criar um motorista com dados válidos", function(){
    const driver = Driver.create("Jane Doe", "jane.doe@gmail.com", "67854852405", "FEH8682");
    expect(driver.driverId).toBeDefined();
    expect(driver.name).toBe("Jane Doe");
    expect(driver.email.value).toBe("jane.doe@gmail.com");
    expect(driver.document.value).toBe("67854852405");
    expect(driver.carPlate.value).toBe("FEH8682");
});


test("Deve enviar erro ao cadastrar um motorista com email inválido", function(){    
    expect(() => Driver.create("Jane Doe", "jane.doe@gmailcom", "67854852405", "FEH8682")).toThrow(new Error("Invalid email"));
});

test("Deve enviar erro ao cadastrar um motorista com cpf inválido", function(){    
    expect(() => Driver.create("Jane Doe", "jane.doe@gmail.com", "67854852415", "FEH8682")).toThrow(new Error("Invalid cpf"));
});

test("Deve enviar erro ao cadastrar um motorista com o car plate inválido", function(){    
    expect(() => Driver.create("Jane Doe", "jane.doe@gmail.com", "67854852405", "FEHZ8682")).toThrow(new Error("Invalid car plate"));
});