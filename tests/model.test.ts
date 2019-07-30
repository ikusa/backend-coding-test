import { generateRideModel } from '../src/db/rideModel';
import { serializeDb } from '../src/db/engine';

describe('model tests', () => {
    describe('ride model tests', () => {
        it('should generate ride model without error', async () => {
            let db = await serializeDb();
            generateRideModel(db);
        });
    });
});
