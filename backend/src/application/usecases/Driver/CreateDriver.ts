import pgp from "pg-promise";
import Cpf from "../../../cpf.validator";

export default class CreateDriver {
    constructor() {}

    async execute(input:Input): Promise<Output> {
        const driverId = crypto.randomUUID();        
		if(!new Cpf(input.document)) {
            throw new Error("invalid cpf");
        }
		
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into lift.driver(id, name, email, document, car_plate) values($1, $2, $3, $4, $5)",[driverId,
			input.name,
			input.email,
			input.document,
            input.carPlate
		]);
		await connection.$pool.end();		
        return { driverId };
    }
}

type Input = {
    name: string,
    email: string,
    document: string,
    carPlate: string
}

type Output = {
    driverId: string
}