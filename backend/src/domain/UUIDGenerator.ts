export default class UUIDGenerator {
    static create() {
        return crypto.randomUUID();
    }    
}