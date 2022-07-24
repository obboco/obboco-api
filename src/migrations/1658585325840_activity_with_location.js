module.exports = {
  up: 'ALTER TABLE activity ADD location VARCHAR(40) AFTER currency;',
  down: 'ALTER TABLE activity DROP currency;'
};
