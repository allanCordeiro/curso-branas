import pgp from "pg-promise";
import Cpf from "../../../cpf.validator";

export default class CreatePassenger {
    constructor() {}

    async execute(input:Input): Promise<Output> {
        const passengerId = crypto.randomUUID();        
		if(!new Cpf(input.document)) {
            throw new Error("invalid cpf");
        }
		
		const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into lift.passenger(id, name, email, document) values($1, $2, $3, $4)",[passengerId,
			input.name,
			input.email,
			input.document
		]);
		await connection.$pool.end();		
        return { passengerId };
    }
}

type Input = {
    name: string,
    email: string,
    document: string
}

type Output = {
    passengerId: string
}