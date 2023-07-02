// @ts-nocheck
export function validate (cpf: string) : boolean {
    if(!isFullFilled(cpf)) {        
        return false;
    }
    cpf = sanitize(cpf);
    if(!isProperLength(cpf.length)) {        
        return false;
    }    
    if (!hasRepeatedNumbers) {        
        return false;
    }
    try{  
        let digitBlock1 = 0, digitBlock2 = 0;                
        let checkDigit1 = 0, checkDigit2 = 0, rest = 0;          
        let verifiedDigitCheck;   
        digitBlock1 = getSumBlock(11, cpf);    
        digitBlock2 = getSumBlock(12, cpf);                        
        rest = (digitBlock1 % 11);          
        checkDigit1 = getRealCheckDigit(rest);        
        digitBlock2 += 2 * checkDigit1;          
        rest = (digitBlock2 % 11);          
        checkDigit2 = getRealCheckDigit(rest);        
        verifiedDigitCheck =  "" + checkDigit1 + checkDigit2; 
        return compareCheckDigits(verifiedDigitCheck, cpf);
        
    } catch (e) {  
        console.error("Erro !"+e);  
        return false;  
    }         
}

function compareCheckDigits(checkDigit: string, cpf: string) : boolean {
    let currentDigitCheck = cpf.substring(cpf.length-2, cpf.length);      
    return currentDigitCheck === checkDigit;
}

function isFullFilled(cpf: string): boolean {
    if (cpf != null && cpf != undefined && typeof cpf === "string" ) {
        return true;
    }
    return false;
}

function isProperLength(len: number): boolean {
    if(len === 11) {
        return true;        
    }
    return false;
}

function sanitize(cpf: string): string {
    return cpf.replace(/\D/g, ""); 
}

function hasRepeatedNumbers(cpf: string): boolean {
    return cpf.split("").every((c) => c === cpf[0])
}

function getRealCheckDigit(mod: number): number {
    return (mod < 2) ? 0 : 11 - mod;  
}

function getSumBlock(digit: number, cpf: string): number {
    let blockNumber = 0, parsedDigit = 0;    
    for (let nCount = 1; nCount < cpf.length -1; nCount++) {  
        parsedDigit = parseInt(cpf.substring(nCount -1, nCount));  							
        blockNumber += (digit - nCount) * parsedDigit;                  
    };  
    return blockNumber;
}

