import { serializeDb } from '../src/db/engine';

describe('db tests', () => {
    it('should serialize without error', () => {
        serializeDb();
    });
});
