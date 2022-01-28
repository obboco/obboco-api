module.exports = {
  up: 'ALTER TABLE activity ADD image_id VARCHAR(40)  NULL  DEFAULT NULL  AFTER partner_id;',
  down: 'ALTER TABLE activity DROP image_id;'
};
