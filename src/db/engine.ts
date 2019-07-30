import sqlite3, { Database } from 'sqlite3';
import buildSchemas from '../schemas';

let sqliteEngine = sqlite3.verbose();
const db = new sqliteEngine.Database(':memory:');

let serializeDb = (): Promise<Database> =>
    new Promise(resolve => {
        db.serialize((): void => {
            buildSchemas(db);
            resolve(db);
        });
    });

let mockSerializeDb = (): Promise<Database> => {
    let db = new sqliteEngine.Database(':memory:');
    return new Promise(resolve => {
        db.serialize((): void => {
            buildSchemas(db);
            resolve(db);
        });
    });
};

export { serializeDb, mockSerializeDb };
