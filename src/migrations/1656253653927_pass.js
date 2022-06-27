module.exports = {
  up: 'CREATE TABLE pass( pass_id VARCHAR(40)PRIMARY KEY, title VARCHAR(40), description VARCHAR(100) DEFAULT "", quantity INT, price INT, currency VARCHAR(40), partner_id VARCHAR(40), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);',
  down: 'DROP TABLE pass;'
};
