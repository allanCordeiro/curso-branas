import { validate } from "../src/cpf";

test("deve enviar true para um cpf valido", function() {
    const cpf = "861.419.820-50";
    const isCpfValid = validate(cpf);
    expect(isCpfValid).toBeTruthy();
});

test("deve enviar true para um cpf valido porem sem mascara", function() {
    const cpf = "86141982050";
    const isCpfValid = validate(cpf);
    expect(isCpfValid).toBeTruthy();
});

test("deve enviar false para um cpf nao valido", function() {
    const cpf = "861.419.820-71";
    const isCpfValid = validate(cpf);
    expect(isCpfValid).toBeFalsy();
});

test("deve enviar false para um cpf com menos de 11 caracteres", function() {
    const cpf = "861.41.82-71";
    const isCpfValid = validate(cpf);
    expect(isCpfValid).toBeFalsy();
});

test("deve enviar false para um cpf com mais de 14 caracteres", function() {
    const cpf = "861.419.820-0001-71";
    const isCpfValid = validate(cpf);
    expect(isCpfValid).toBeFalsy();
});

test("deve enviar false para um cpf com numeros repetidos", function(){
    const cpf = "111111111111";
    const isCpfValid = validate(cpf);
    expect(isCpfValid).toBeFalsy(); 
});

test("deve enviar um erro pois é um dado não esperado", function(){
    const cpf = "este será um erro";
    const isCpfValid = validate(cpf);
    expect(isCpfValid).toBeFalsy(); 
});