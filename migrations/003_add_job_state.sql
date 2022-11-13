ALTER TABLE `jobs` ADD `status` ENUM('active','disabled')  NOT NULL  DEFAULT 'active' AFTER `method`;
