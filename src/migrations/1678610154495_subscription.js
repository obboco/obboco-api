module.exports = {
  up: 'CREATE TABLE subscription( subscription_id VARCHAR(40)PRIMARY KEY, partner_id VARCHAR(40), name VARCHAR(40), price INT, currency VARCHAR(40), cycle VARCHAR(40), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);',
  down: 'DROP TABLE subscription;',
};
