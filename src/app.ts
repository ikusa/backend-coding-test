import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { Database } from 'sqlite3';

import swaggerDocument from './doc/swagger.json';
import { generateRideModel } from './db/rideModel';
import validator from './lib/validator';

const app = express();

const jsonParser = bodyParser.json();

export default (db: Database) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get('/health', (_, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, validator('rideInput'), async (req, res) => {
        try {
            let rideModel = generateRideModel(db);
            let rideId = await rideModel.addRide({
                ...req.body,
            });
            let ride = await rideModel.getRide(rideId);
            res.send(ride);
        } catch (e) {
            res.send(e);
        }
    });
    app.get('/rides', async (_, res) => {
        try {
            let rideModel = generateRideModel(db);
            let rides = await rideModel.getRides();
            res.send(rides);
        } catch (e) {
            res.send(e);
        }
    });

    app.get('/rides/:id', async (req, res) => {
        try {
            let rideModel = generateRideModel(db);
            let rides = await rideModel.getRide(req.params.id);
            res.send(rides);
        } catch (e) {
            res.send(e);
        }
    });

    return app;
};
