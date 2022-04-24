module.exports = {
  up: 'ALTER TABLE activity ADD price INT DEFAULT 0 AFTER description,  ADD currency VARCHAR(40)  NULL  DEFAULT "EUR"  AFTER price;',
  down: 'ALTER TABLE activity DROP price, DROP currency;'
};
