export default interface DriverRepository {
    save(driver: any): Promise<void>
    get(driverId: string): any
}