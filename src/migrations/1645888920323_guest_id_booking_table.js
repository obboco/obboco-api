module.exports = {
  up: 'ALTER TABLE `booking` CHANGE `email` `guest_id` VARCHAR(40) NULL  DEFAULT NULL',
  down: 'ALTER TABLE `booking` CHANGE `guest_id` `email` VARCHAR(40) NULL  DEFAULT NULL'
};
