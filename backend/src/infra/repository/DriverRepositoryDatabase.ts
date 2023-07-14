import pgp from "pg-promise";

import DriverRepository from "../../application/repository/DriverRepository";

export default class DriverRepositoryDatabase implements DriverRepository {
    async save(driver: any): Promise<void> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into lift.driver(id, name, email, document, car_plate) values($1, $2, $3, $4, $5)",[driver.driverId,
			driver.name,
			driver.email,
			driver.document,
            driver.carPlate
		]);
		await connection.$pool.end();	
    }
    
    async get(driverId: string) {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [driverData] = await connection.query("select id, name, email, document, car_plate from lift.driver where id = $1",[driverId]);
		await connection.$pool.end();
		return {		
            id: driverData.id,	
			name: driverData.name,
			email: driverData.email,
			document: driverData.document,
			carPlate: driverData.car_plate
		};
    }    
}