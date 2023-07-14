export default class CarPlate {
    constructor(readonly value: string) {
        if(!this.validate()) {
            throw new Error("Invalid car plate");
            
        }
    }

    private validate(): boolean {
        const regex = /^[A-Z]{3}[0-9]{4}$/;
        return regex.test(this.value.toUpperCase());
    }
}