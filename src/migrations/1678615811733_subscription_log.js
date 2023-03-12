module.exports = {
  up: 'CREATE TABLE subscription_log( subscription_log_id VARCHAR(40)PRIMARY KEY, subscription_guest_id VARCHAR(40), guest_id VARCHAR(40), subscription_id VARCHAR(40), partner_id VARCHAR(40), price INT, currency VARCHAR(40), status VARCHAR(40), log_date DATETIME, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);',
  down: 'DROP TABLE subscription_log;',
};
