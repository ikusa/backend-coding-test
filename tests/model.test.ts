import { generateRideModel } from '../src/db/rideModel';
import { mockSerializeDb } from '../src/db/engine';
import { Database } from 'sqlite3';

describe('model tests', () => {
    describe('ride model tests', () => {
        it('should generate ride model without error', async () => {
            let db: Database = await mockSerializeDb();
            generateRideModel(db);
        });
    });
});
