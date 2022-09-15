module.exports = {
  up: 'ALTER TABLE booking CHANGE start_date start_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;',
  down: ''
};
