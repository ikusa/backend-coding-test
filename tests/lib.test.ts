import logger from '../src/lib/logger';

describe('Library tests', () => {
    describe('Logger', () => {
        it('should log without error', () => {
            logger.log('info', 'logging without error');
        });
    });
});
