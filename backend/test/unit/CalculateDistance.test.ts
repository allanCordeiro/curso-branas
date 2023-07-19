import Coordinate from "../../src/domain/Coordinate";
import DistanceCalculator from "../../src/domain/DistanceCalculator";

test("Deve calcular uma distancia entre dois pontos válida", function() {
    const fromLat = -23.550520;
    const fromLong = -46.633308;
    const toLat = 40.712776;
    const toLong = -74.005974;
    const expectedDistance = 7686;

    const from = new Coordinate(fromLat, fromLong);
    const to = new Coordinate(toLat, toLong);
    const currentDistance = DistanceCalculator.calculate(from, to);
    expect(currentDistance).toBe(expectedDistance);
    
});