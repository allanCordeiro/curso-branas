// @ts-nocheck
export function validate (str) {
    if(!isFullFilled(str)) {
        return false;
    }
    str = sanitize(str);
    if(!isRightLength(str.length)) {
        return false;
    }
    
    if (!hasRepeatedNumbers) {
        return false;
    }

    try{  
        let     d1, d2;  
        let     dg1, dg2, rest;  
        let     digito;  
            let     nDigResult;  
        d1 = d2 = 0;  
        dg1 = dg2 = rest = 0;  
            
        for (let nCount = 1; nCount < str.length -1; nCount++) {  
            digito = parseInt(str.substring(nCount -1, nCount));  							
            d1 = d1 + ( 11 - nCount ) * digito;  

            d2 = d2 + ( 12 - nCount ) * digito;                  
        };  
            
        rest = (d1 % 11);  

        dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;  
        d2 += 2 * dg1;  
        rest = (d2 % 11);  
        if (rest < 2)  
            dg2 = 0;  
        else  
            dg2 = 11 - rest;  

            let nDigVerific = str.substring(str.length-2, str.length);  
        nDigResult = "" + dg1 + "" + dg2;  
        return nDigVerific == nDigResult;
    }catch (e){  
        console.error("Erro !"+e);  

        return false;  
    }         
}

function isFullFilled(cpf: string): boolean {
    if (cpf != null && cpf != undefined && typeof cpf === "string" ) {
        return true;
    }
    return false;
}

function isRightLength(len: number): boolean {
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