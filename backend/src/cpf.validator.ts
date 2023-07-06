export default class Cpf {
    value: string;
    constructor(value: string) {
        this.value = value;
        if(!this.validate()) throw new Error("invalid cpf");
        
    }

    private validate () {
        if(!this.value) return false;        
        this.sanitize();
        if(this.isProperLength()) return false;        
        if (this.hasRepeatedNumbers()) return false;                  
        const digit1 = this.calculateDigit(10);
        const digit2 = this.calculateDigit(11);    
        return this.compareCheckDigits(`${digit1}${digit2}`);     
    }

    private compareCheckDigits(checkDigit: string) : boolean {
        let currentDigitCheck = this.value.slice(9);      
        return currentDigitCheck === checkDigit;
    }
    
    private isProperLength(): boolean {
        return this.value.length !== 11;
    }

    private sanitize(): void {
        this.value = this.value.replace(/\D/g, ""); 
    }

    private hasRepeatedNumbers(): boolean {
        return this.value.split("").every((c) => c === this.value[0])
    }

    private getRealCheckDigit(mod: number): number {
        return (mod < 2) ? 0 : 11 - mod;  
    }

    private calculateDigit(factor: number): number {
        let total = 0;
        for (const digit of this.value) {
            if(factor > 1) {
                total += parseInt(digit) * factor--;
            }
        }
        const mod = total % 11;
        return(mod<2) ? 0 : 11 - mod;
    }
}