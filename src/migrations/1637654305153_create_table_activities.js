module.exports = {
  up: ' CREATE TABLE activity(activity_id VARCHAR(40)PRIMARY KEY, title VARCHAR(200), description VARCHAR(499), partner_id VARCHAR(40), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);',
  down: 'DROP TABLE activity;'
};
