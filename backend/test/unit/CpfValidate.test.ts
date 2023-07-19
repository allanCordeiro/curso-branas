import Cpf from "../../src/domain/Cpf";


test.each([
    "86141982050",
    "51475150032",
    "17422998067",
    "67854852405"
])("Deve testar os cpfs validos", function(value:string) {
    const cpf = new Cpf(value);
    expect(cpf.value).toBe(value);
});

test.each([
    "861.419.820-71",
    "861.41.82-71",
    "861.419.820-0001-71",
    "99999999999",
    "",    
])("Deve testar os cpfs nao validos", function(value: string){    
    expect(() => new Cpf(value)).toThrow(new Error("Invalid cpf"));    
});



    