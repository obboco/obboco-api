module.exports = {
  up: 'ALTER TABLE guest_pass ADD  partner_id VARCHAR(40) AFTER guest_id;',
  down: 'ALTER TABLE guest_pass DROP partner_id;'
};
