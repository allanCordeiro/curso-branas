import pgp from "pg-promise";

export default class GetDriver {

    constructor() {}

    async execute(input: Input): Promise<Output> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [driverData] = await connection.query("select name, email, document, car_plate from lift.driver where id = $1",[input.driverId]);
		await connection.$pool.end();
		return {			
			name: driverData.name,
			email: driverData.email,
			document: driverData.document,
			carPlate: driverData.car_plate
		};
    }
}

type Input = {
    driverId: string
}

type Output = {
    name: string,
    email: string,
    document: string,
    carPlate: string,
}