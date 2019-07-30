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

type RideModel = {
    getRides: () => Promise<Ride[]>;
    getRide: (id: number) => Promise<Ride>;
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
    return {
        getRides,
        getRide,
    };
};

export { generateRideModel };
