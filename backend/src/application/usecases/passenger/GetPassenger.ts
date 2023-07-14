import pgp from "pg-promise";
import PassengerRepository from "../../repository/PassengerRepository";

export default class GetPassenger {
    constructor(readonly passengerRepository: PassengerRepository) {}

    async execute(input: Input): Promise<Output> {
        const passenger = await this.passengerRepository.get(input.passengerId);
        return {
            name: passenger.name,
            email: passenger.email.value,
            document: passenger.document.value
        }
    }
}

type Input = {
    passengerId: string
}

type Output = {
    name: string,
    email: string,
    document: string
}