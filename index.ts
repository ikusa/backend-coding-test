import logger from './src/lib/logger';
import { serializeDb } from './src/db/engine';
import appGenerator from './src/app';

const port = 8010;
let main = async (): Promise<void> => {
    let db = await serializeDb();
    const app = appGenerator(db);

    app.listen(port, (): void => {
        return console.log(`App started and listening on port ${port}`);
    });
};
main().catch(e => {
    console.log(e);
});

console.log = logger.info;
