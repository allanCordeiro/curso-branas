import pgp from "pg-promise";
import Cpf from "../../domain/Cpf";
import DriverRepositoryDatabase from "../../../infra/repository/DriverRepositoryDatabase";
import DriverRepository from "../../repository/DriverRepository";

export default class CreateDriver {
    constructor(readonly driverRepository: DriverRepository) {}

    async execute(input:Input): Promise<Output> {
        const driverId = crypto.randomUUID();        
		if(!new Cpf(input.document)) {
            throw new Error("invalid cpf");
        }				
        await this.driverRepository.save({driverId: driverId, name: input.name, email: input.email, document: input.document, carPlate: input.carPlate});
        return { driverId };
    }
}

type Input = {
    name: string,
    email: string,
    document: string,
    carPlate: string
}

type Output = {
    driverId: string
}