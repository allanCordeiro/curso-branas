import Passenger from "../domain/Passenger";

export default interface PassengerRepository {
    save(passenger:Passenger): Promise<any>;
    get(passengerId: string): Promise<Passenger>;
}