import pgp from "pg-promise";

export default class GetPassenger {
    constructor() {}

    async execute(input: Input): Promise<Output> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [userData] = await connection.query("select name, email, document from lift.passenger where id = $1",[input.passengerId]);
		await connection.$pool.end();        
        return {
            name: userData.name,
            email: userData.email,
            document: userData.document
        }
    }
}

type Input = {
    passengerId: string
}

type Output = {
    name: string,
    email: string,
    document: string
}