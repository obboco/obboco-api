module.exports = {
  up: 'ALTER TABLE booking ADD source VARCHAR(40) AFTER guest;',
  down: 'ALTER TABLE booking DROP source;'
};
