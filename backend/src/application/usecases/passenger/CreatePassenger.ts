import pgp from "pg-promise";
import Cpf from "../../../cpf.validator";
import PassengerRepository from "../../repository/PassengerRepository";

export default class CreatePassenger {
    constructor(readonly passengerRepository: PassengerRepository) {}

    async execute(input:Input): Promise<Output> {
        const passengerId = crypto.randomUUID();        
		if(!new Cpf(input.document)) {
            throw new Error("invalid cpf");
        }
		
        await this.passengerRepository.save({passengerId: passengerId, name: input.name, email: input.email, document: input.document });		
        return { passengerId };
    }
}

type Input = {
    name: string,
    email: string,
    document: string
}

type Output = {
    passengerId: string
}