import { Database } from 'sqlite3';

type Ride = {
    rideID: number;
    startLat: number;
    startLong: number;
    endLat: number;
    endLong: number;
    riderName: string;
    driverName: string;
    driverVehicle: string;
    created: string;
};
type RideInput = {
    start_lat: number;
    start_long: number;
    end_lat: number;
    end_long: number;
    rider_name: string;
    driver_name: string;
    driver_vehicle: string;
};
type RideModel = {
    getRides: () => Promise<Ride[]>;
    getRide: (id: number) => Promise<Ride>;
    addRide: (input: RideInput) => Promise<number>;
};

let generateRideModel = (db: Database): RideModel => {
    let getRides = (): Promise<Ride[]> => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Rides', function(err, rows) {
                if (err) {
                    reject({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error',
                    });
                }

                if (rows.length === 0) {
                    reject({
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides',
                    });
                }

                resolve(rows);
            });
        });
    };
    let getRide = (rideId: number): Promise<Ride> => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Rides WHERE rideID= ?', rideId, function(err, rows) {
                if (err) {
                    return reject({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error',
                    });
                }
                if (rows.length === 0) {
                    return reject({
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides',
                    });
                }
                resolve(rows[0]);
            });
        });
    };
    let addRide = ({
        start_lat,
        start_long,
        end_lat,
        end_long,
        driver_name,
        driver_vehicle,
        rider_name,
    }: RideInput): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    start_lat,
                    start_long,
                    end_lat,
                    end_long,
                    rider_name,
                    driver_name,
                    driver_vehicle,
                ],
                function(err) {
                    if (err) {
                        reject({
                            error_code: 'SERVER_ERROR',
                            message: 'Unknown error',
                        });
                    }

                    resolve(this.lastID);
                },
            );
        });
    };
    return {
        getRides,
        getRide,
        addRide,
    };
};

export { generateRideModel };
