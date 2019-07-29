import request from 'supertest';
import sqlite3 from 'sqlite3';
import appGenerator from '../src/app';
import buildSchemas from '../src/schemas';

const sqlite3Engine = sqlite3.verbose();
const db = new sqlite3Engine.Database(':memory:');

const app = appGenerator(db);

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
});
