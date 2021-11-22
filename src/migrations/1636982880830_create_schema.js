module.exports = {
  up: `CREATE TABLE partners(
   partner_id VARCHAR(40)PRIMARY KEY,
   email VARCHAR(40),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`,
  down: "DROP TABLE partners"
};
