CREATE TABLE `jobs` (
  id INT(11) NOT NULL auto_increment AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `cron` VARCHAR(30) NOT NULL,
  `url` TEXT  NOT NULL,
  `method` ENUM ('HEAD', 'POST', 'GET', 'PUT') DEFAULT 'GET',
  PRIMARY KEY (`id`),
  UNIQUE `idx_name_unique` (`name`(255))
);

CREATE TABLE `jobs_logs` (
  id INT(11) NOT NULL auto_increment AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` TEXT  NOT NULL,
  `status` VARCHAR(3) NOT NULL,
  `process_key` VARCHAR(255) NOT NULL,
  `jobs_id` INT(11) NULL,
  FOREIGN KEY (jobs_id) REFERENCES jobs(id),
  PRIMARY KEY (`id`)
);
