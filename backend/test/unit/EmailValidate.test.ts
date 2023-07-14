import Email from "../../src/application/domain/Email";

test("Deve aceitar um email válido", function() {    
    const email = new Email("john.doe@gmail.com");
    expect(email).toBeTruthy();
})

test("Não deve aceitar um email inválido", function() {
    expect(() => new Email("emailinvalido@gmail")).toThrow(new Error("Invalid email"));
    
});

test("Não deve aceitar um email inválido (sem arroba)", function() {
    expect(() => new Email("emailinvalidoarrobagmail.com")).toThrow(new Error("Invalid email"));
    
});