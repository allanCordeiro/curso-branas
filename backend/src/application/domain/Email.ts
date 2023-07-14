export default class Email {    
    constructor(readonly value: string) {
        if(!this.validate()) {
            throw new Error("Invalid email");            
        }
    }

    private validate(): boolean {
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return regex.test(this.value.toLowerCase());
    }
}