import pgp from "pg-promise";
import date from 'date-and-time';

export default class GetRide {
    constructor() {}

    async execute(input: Input): Promise<Output> {        
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
		const [rideData] = await connection.query("select p.name as pname, p.document as pdoc, d.name as dname, d.document as ddoc, d.car_plate, r.status, r.request_date from lift.ride r inner join lift.passenger p on p.id = r.passenger_id left join lift.driver d on d.id = r.driver_id where r.id = $1",
        [input.rideId]
        );
		if (!rideData) {
            throw new Error("data not found");
        }		
		await connection.$pool.end();
		let waitingTime = Date.now() - rideData.request_date;
		waitingTime = Math.round(waitingTime/60000);
		return({			
			passenger: {				
				name: rideData.pname,
				document: rideData.pdoc
			},
			driver: {
				name: rideData.dname,
				document: rideData.ddoc,
				carPlate: rideData.car_plate
			}, 
			status: rideData.status,
			waitingMinutes: waitingTime,
		});
    }
}

type Input = {
    rideId: string
}

type Output = {
    passenger: {
        name: string,
        document: string
    },
    driver: {
        name: string,
        document: string,
        carPlate: string,
    }
    status: string,
    waitingMinutes: number
}