import pgp from "pg-promise";

import PassengerRepository from "../../application/repository/PassengerRepository";
import Passenger from "../../application/domain/Passenger";

export default class PassengerRepositoryDatabase implements PassengerRepository {
    async save(passenger: Passenger): Promise<void> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into lift.passenger(id, name, email, document) values($1, $2, $3, $4)",[passenger.passengerId,
			passenger.name,
			passenger.email.value,
			passenger.document.value
		]);
		await connection.$pool.end();
    }

    async get(passengerId: string): Promise<Passenger> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [userData] = await connection.query("select id, name, email, document from lift.passenger where id = $1",[passengerId]);
		await connection.$pool.end();        
        return new Passenger(userData.passenger_id, userData.name, userData.email, userData.document);        
    }    
}