module.exports = {
  up: 'ALTER TABLE booking ADD type VARCHAR(40) AFTER source, ADD guest_pass_id VARCHAR(40) AFTER type;',
  down: 'ALTER TABLE booking DROP type, DROP guest_pass_id;'
};
