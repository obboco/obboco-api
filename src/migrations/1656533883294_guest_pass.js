module.exports = {
  up: 'CREATE TABLE guest_pass( guest_pass_id VARCHAR(40)PRIMARY KEY, pass_id VARCHAR(40), guest_id VARCHAR(40), quantity SMALLINT, current_quantity SMALLINT, price INT, currency VARCHAR(40), status VARCHAR(40), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);',
  down: 'DROP TABLE guest_pass;'
};
