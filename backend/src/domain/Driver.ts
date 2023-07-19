import CarPlate from "./CarPlate";
import Cpf from "./Cpf";
import Email from "./Email";
import UUIDGenerator from "./UUIDGenerator";

export default class Driver {
    email: Email;
    document: Cpf;
    carPlate: CarPlate;

    constructor(readonly driverId: string, readonly name: string, email: string, document: string, carPlate: string) {
        this.email = new Email(email);
        this.document = new Cpf(document);
        this.carPlate = new CarPlate(carPlate);
    }

    static create(name: string, email: string, document: string, carPlate: string) {
        const driverId = UUIDGenerator.create();
        return new Driver(driverId, name, email, document, carPlate);
    }
}