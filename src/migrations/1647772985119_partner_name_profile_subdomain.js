module.exports = {
  up: 'ALTER TABLE partner ADD given_name VARCHAR(40) NULL AFTER email, ADD family_name VARCHAR(40) NULL AFTER given_name, ADD picture VARCHAR(250) NULL AFTER family_name, ADD subdomain VARCHAR(80) NULL AFTER subscription_plan;',
  down: 'ALTER TABLE partner DROP given_name, DROP family_name, DROP picture, DROP subdomain;'
};
