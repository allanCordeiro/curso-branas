import Segment from "../../src/ride/segment";

test("deve retornar a distancia correta entre SP e NY", function() {
    const latA = -23.550520;
    const longA = -46.633308;
    const latB = 40.712776;
    const longB = -74.005974;
    const expectedDistance = 7685.62;

    const segment = new Segment(latA, longA, latB, longB, new Date());
    const output = segment.distance;
    expect(output).toBe(expectedDistance);
})