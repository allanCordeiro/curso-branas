import pgp from "pg-promise";

import DriverRepository from "../../application/repository/DriverRepository";
import Driver from "../../domain/Driver";

export default class DriverRepositoryDatabase implements DriverRepository {
    async save(driver: Driver): Promise<void> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		await connection.query("insert into lift.driver(id, name, email, document, car_plate) values($1, $2, $3, $4, $5)",[driver.driverId,
			driver.name,
			driver.email.value,
			driver.document.value,
            driver.carPlate.value
		]);
		await connection.$pool.end();	
    }
    
    async get(driverId: string): Promise<Driver> {
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [driverData] = await connection.query("select id, name, email, document, car_plate from lift.driver where id = $1",[driverId]);
		await connection.$pool.end();
		return new Driver(driverData.id, driverData.name, driverData.email, driverData.document, driverData.car_plate);
    }    
}