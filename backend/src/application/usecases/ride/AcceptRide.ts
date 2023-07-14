import pgp from "pg-promise";
import date from 'date-and-time';

export default class AcceptRide {
    constructor() {}

    async execute(input: Input): Promise<void> {        
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const currentDate = new Date();
		await connection.query("update lift.ride set driver_id = $2, status = $3, accept_date = $4 where id = $1",[input.rideId,
			input.driverId,
			'accepted',
			date.format(currentDate, 'YYYY-MM-DD HH:mm:ss'),			
		]);
		await connection.$pool.end();				
    }
}

type Input = {
    rideId: string,
    driverId: string
}

