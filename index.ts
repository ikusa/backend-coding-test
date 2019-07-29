import logger from './src/lib/logger';
import sqlite3 from 'sqlite3';
import buildSchemas from './src/schemas';

import appGenerator from './src/app';

const port = 8010;
let sqliteEngine = sqlite3.verbose();
const db = new sqliteEngine.Database(':memory:');

db.serialize((): void => {
    buildSchemas(db);

    const app = appGenerator(db);

    app.listen(port, (): void => {
        return console.log(`App started and listening on port ${port}`);
    });
});

console.log = logger.info;
