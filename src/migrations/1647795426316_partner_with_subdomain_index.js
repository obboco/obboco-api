module.exports = {
  up: 'ALTER TABLE `partner` ADD INDEX `partner_subdomain_index` (`subdomain`)',
  down: 'DROP INDEX partner_subdomain_index ON partner;'
};
