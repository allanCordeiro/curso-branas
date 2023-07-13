import pgp from "pg-promise";

import PassengerRepository from "../../application/repository/PassengerRepository";

export default class PassengerRepositoryDatabase implements PassengerRepository {
    async save(passenger: any): Promise<any> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into lift.passenger(id, name, email, document) values($1, $2, $3, $4)",[passenger.passengerId,
			passenger.name,
			passenger.email,
			passenger.document
		]);
		await connection.$pool.end();
    }

    async get(passengerId: string): Promise<any> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [userData] = await connection.query("select name, email, document from lift.passenger where id = $1",[passengerId]);
		await connection.$pool.end();        
        return {
            name: userData.name,
            email: userData.email,
            document: userData.document
        }
    }    
}