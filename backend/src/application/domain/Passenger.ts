import Cpf from "./Cpf";
import Email from "./Email";
import UUIDGenerator from "./UUIDGenerator";

export default class Passenger {
    document: Cpf;
    email: Email;

    constructor(readonly passengerId: string, readonly name: string, email: string, document: string) {
        this.document = new Cpf(document);
        this.email = new Email(email);    
    }

    static create(name: string, email: string, document: string) {
        const id = UUIDGenerator.create();
        return new Passenger(id, name, email, document);
    }
}