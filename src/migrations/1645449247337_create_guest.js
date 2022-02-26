module.exports = {
  up: `
  CREATE TABLE guest( guest_id VARCHAR(40)PRIMARY KEY, email VARCHAR(40), first_name VARCHAR(40), last_name VARCHAR(40), phone VARCHAR(40), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
    `,
  down: 'DROP TABLE guest;'
};
