import pgp from "pg-promise";
import DriverRepository from "../../repository/DriverRepository";

export default class GetDriver {

    constructor(readonly driverRepository: DriverRepository) {}

    async execute(input: Input): Promise<Output> {
        const driver = await this.driverRepository.get(input.driverId);        
        return {
            name: driver.name,
            email: driver.email.value,
            document: driver.document.value,
            carPlate: driver.carPlate.value
        }
    }
}

type Input = {
    driverId: string
}

type Output = {
    name: string,
    email: string,
    document: string,
    carPlate: string,
}