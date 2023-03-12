module.exports = {
  up: 'CREATE TABLE subscription_guest( subscription_guest_id VARCHAR(40)PRIMARY KEY, guest_id VARCHAR(40), subscription_id VARCHAR(40), partner_id VARCHAR(40), start_date DATETIME, end_date DATETIME NULL DEFAULT NULL, status VARCHAR(40), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);',
  down: 'DROP TABLE subscription_guest;',
};
