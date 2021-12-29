module.exports = {
  up: `
  CREATE TABLE booking( booking_id VARCHAR(40)PRIMARY KEY, event_id VARCHAR(40), status VARCHAR(40), email VARCHAR(40), guest TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
    `,
  down: 'DROP TABLE booking;'
};
