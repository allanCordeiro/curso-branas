import Segment from "../../src/domain/Segment";

test("deve validar caso a distancia do segmento seja maior que zero", function() {
    const segment = new Segment(10, new Date("2023-05-01 10:00"));
    expect(segment.isValidDistance()).toBeTruthy();
});

test("deve validar caso a data esteja no formato esperado", function() {
    const segment = new Segment(10, new Date("2023-05-01 10:00"));
    expect(segment.isValidDate()).toBeTruthy();
});

test("deve devolver false caso a distancia do segmento seja menor do que zero", function() {
    expect(() => new Segment(-5, new Date("2023-05-01 10:00"))).toThrow(new Error("Invalid distance"));
    
});

