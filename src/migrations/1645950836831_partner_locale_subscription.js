module.exports = {
  up: 'ALTER TABLE partner ADD locale VARCHAR(10)  DEFAULT "en-GB" AFTER email,  ADD subscription_plan VARCHAR(40)  NULL  DEFAULT "BETA"  AFTER locale;',
  down: 'ALTER TABLE partner DROP local, DROP subscription_plan;'
};
