module.exports = {
  up: ' CREATE TABLE event(event_id VARCHAR(40)PRIMARY KEY, start_date TIMESTAMP, duration SMALLINT, capacity SMALLINT, current_capacity SMALLINT, activity_id VARCHAR(40), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);',
  down: 'DROP TABLE event;'
};
