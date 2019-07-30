import request from 'supertest';
import sqlite3 from 'sqlite3';
import appGenerator from '../src/app';
import buildSchemas from '../src/schemas';

const sqlite3Engine = sqlite3.verbose();
const db = new sqlite3Engine.Database(':memory:');

const app = appGenerator(db);

let rideInput = {
    start_lat: 51,
    start_long: 51,
    end_lat: 51,
    end_long: 51,
    rider_name: 'Josh',
    driver_name: 'Joko',
    driver_vehicle: 'Vario',
};
describe('API tests', () => {
    before(done => {
        db.serialize(() => {
            buildSchemas(db);
            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', done => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
    describe('POST /rides', () => {
        it('should create a new ride entry without error', done => {
            request(app)
                .post('/rides')
                .send(rideInput)
                .expect(200, done);
        });
        it('should response with validation error', done => {
            request(app)
                .post('/rides')
                .send({ ...rideInput, rider_name: 123 })
                .expect(
                    200,
                    {
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string',
                    },
                    done,
                );
        });
        it('should response with validation error', done => {
            request(app)
                .post('/rides')
                .send({ ...rideInput, driver_name: 123 })
                .expect(
                    200,
                    {
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string',
                    },
                    done,
                );
        });
        it('should response with validation error', done => {
            request(app)
                .post('/rides')
                .send({ ...rideInput, driver_vehicle: 123 })
                .expect(
                    200,
                    {
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string',
                    },
                    done,
                );
        });
    });
    describe('GET /rides', () => {
        it('should fetch ride entries without error', done => {
            request(app)
                .get('/rides')
                .send(rideInput)
                .expect(200, done);
        });
    });
    describe('GET /rides/1', () => {
        it('should fetch ride entry without error', done => {
            request(app)
                .get('/rides/1')
                .send(rideInput)
                .expect(200, done);
        });
        it('should return rides not found error', done => {
            request(app)
                .get('/rides/2')
                .send(rideInput)
                .expect(
                    200,
                    {
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides',
                    },
                    done,
                );
        });
    });
});
