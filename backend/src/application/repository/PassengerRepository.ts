export default interface PassengerRepository {
    save(passenger:any): Promise<any>;
    get(passengerId: string): Promise<any>;
}