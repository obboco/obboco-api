module.exports = {
  up: 'ALTER TABLE booking ADD activity_id VARCHAR(40) AFTER event_id, ADD partner_id VARCHAR(40) AFTER activity_id;',
  down: 'ALTER TABLE booking DROP activity_id, DROP partner_id;'
};
