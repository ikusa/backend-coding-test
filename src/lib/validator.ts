import { Request, Response, NextFunction } from 'express';

type Input = 'rideInput';

let validators = {
    rideInput: (req: Request, res: Response, next: NextFunction) => {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (
            startLatitude < -90 ||
            startLatitude > 90 ||
            startLongitude < -180 ||
            startLongitude > 180
        ) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message:
                    'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            });
        }

        if (
            endLatitude < -90 ||
            endLatitude > 90 ||
            endLongitude < -180 ||
            endLongitude > 180
        ) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message:
                    'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }
        next();
    },
};

export default function validator(
    name: Input,
): (req: Request, res: Response, next: NextFunction) => void {
    return validators[name];
}
