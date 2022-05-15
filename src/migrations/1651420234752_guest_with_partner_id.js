module.exports = {
  up: 'ALTER TABLE guest ADD partner_id VARCHAR(40) AFTER guest_id;',
  down: 'ALTER TABLE guest DROP partner_id;'
};
