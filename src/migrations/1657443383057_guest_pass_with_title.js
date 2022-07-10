module.exports = {
  up: 'ALTER TABLE guest_pass ADD  title VARCHAR(40) AFTER guest_id;',
  down: 'ALTER TABLE guest_pass DROP title;'
};
