import pgp from "pg-promise";
import date from 'date-and-time';

export default class RequestRide {
    constructor() {}

    async execute(input: Input): Promise<Output> {        
        const connection = pgp()("postgres://user:password@localhost:5432/ride-app");
        const currentDate = new Date();

        const segmentId = crypto.randomUUID();
        await connection.query("insert into lift.segment(id, lat_from, long_from, lat_to, long_to, ride_time) values($1, $2, $3, $4, $5, $6)", [segmentId,
            input.from[0],
            input.from[1],
            input.to[0],
            input.to[1],
            date.format(currentDate, 'YYYY-MM-DD HH:mm:ss')
        ]);

        const rideId = crypto.randomUUID();		
        await connection.query("insert into lift.ride(id, passenger_id, driver_id, status, segment_id, request_date, accept_date) values($1, $2, $3, $4, $5, $6, $7)",[rideId,
            input.passengerId,
            null,
            'waiting_driver',
            segmentId,
            date.format(currentDate, 'YYYY-MM-DD HH:mm:ss'),
            null
        ]);
        await connection.$pool.end();
        return { rideId };
    }
}

type Input = {
    passengerId: string,
    from: Array<number>,
    to: Array<number>
}

type Output = {
    rideId: string
}