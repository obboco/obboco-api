module.exports = {
  up: 'ALTER TABLE booking ADD price INT DEFAULT 0 AFTER duration,  ADD currency VARCHAR(40)  NULL  DEFAULT "EUR"  AFTER price;',
  down: 'ALTER TABLE booking DROP price, DROP currency;'
};
