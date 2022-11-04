ALTER TABLE `jobs_logs` DROP FOREIGN KEY `jobs_logs_ibfk_1`;
ALTER TABLE `jobs_logs` DROP INDEX `jobs_id`;

ALTER TABLE `jobs_logs`
ADD CONSTRAINT `jobs_id`
  FOREIGN KEY (jobs_id)
  REFERENCES jobs(id)
  ON DELETE CASCADE;


CREATE TABLE `migrations` (
  id INT(11) NOT NULL auto_increment AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sequence` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO migrations (sequence) VALUES ('001');
INSERT INTO migrations (sequence) VALUES ('002');