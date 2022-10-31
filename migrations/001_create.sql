CREATE TABLE `ping_logs` (
  id INT(11) NOT NULL auto_increment AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` TEXT  NOT NULL,
  `status` VARCHAR(3) NOT NULL,
  `process_key` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);
