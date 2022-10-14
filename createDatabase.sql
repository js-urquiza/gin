CREATE DATABASE  IF NOT EXISTS `rentalis_db`;

USE `rentalis_db`;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(64) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `category` VARCHAR(45) NULL,
  `name` VARCHAR(255) NULL,
  `lastName` VARCHAR(255) NULL,
  `birthDate` DATE NULL,
  `profilePhoto` VARCHAR(500) NULL,
  `adress` VARCHAR(255) NULL,
  `city` VARCHAR(45) NULL,
  `province` VARCHAR(45) NULL,
  `postalCode` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `whatsapp` VARCHAR(45) NULL,
  `verified` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `landlords` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `alsoHandledByUser` INT NULL,
  `email` VARCHAR(64) NULL,
  `category` VARCHAR(45) NULL,
  `name` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NULL,
  `birthDate` DATE NULL,
  `profilePhoto` VARCHAR(500) NULL,
  `adress` VARCHAR(500) NULL,
  `city` VARCHAR(45) NULL,
  `province` VARCHAR(45) NULL,
  `postalCode` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `whatsapp` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `tenants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `landlordId` INT NOT NULL,
  `email` VARCHAR(64) NULL,
  `category` VARCHAR(45) NULL,
  `name` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NULL,
  `birthDate` DATE NULL,
  `profilePhoto` VARCHAR(500) NULL,
  `adress` VARCHAR(500) NULL,
  `city` VARCHAR(45) NULL,
  `province` VARCHAR(45) NULL,
  `postalCode` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `whatsapp` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `contracts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `landlordId` INT NOT NULL,
  `tenantId` INT NOT NULL,
  `propertyId` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  `startDate` DATE NULL,
  `endDate` DATE NULL,
  `duration` TINYINT NULL,
  `paymentMethod` VARCHAR(64) NULL,
  `gracePeriod` TINYINT NULL,
  `dailyLateFee` DECIMAL(10,2) NULL,
  `file` VARCHAR(500) NULL,
  `handled` TINYINT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `rents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `contractId` INT NOT NULL,
  `dueDate` DATE NOT NULL,
  `amount` DECIMAL(10,2) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `expenses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `contractId` INT NOT NULL,
  `name` VARCHAR(64) NULL,
  `dueDate` DATE NULL,
  `amount` DECIMAL(10,2) NULL,
  `coeff` DECIMAL(10,2) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `contractId` INT NOT NULL,
  `paymentDate` DATE NULL,
  `paymentMethod` VARCHAR(64) NULL,
  `amount` DECIMAL(10,2) NULL,
  `details` VARCHAR(500) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `properties` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `landlordId` INT NOT NULL,
  `streetName` VARCHAR(255) NOT NULL,
  `streetNumber` VARCHAR(45) NULL,
  `apartment` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `province` VARCHAR(45) NULL,
  `postalCode` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `propertyId` INT NOT NULL,
  `handledBy` INT NULL,
  `title` VARCHAR(45) NOT NULL,
  `priority` VARCHAR(45) NULL,
  `description` VARCHAR(500) NULL,
  `status` VARCHAR(45) NULL,
  `startDate` DATE NULL,
  `endDate` DATE NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `deletedAt` DATETIME NULL,
  PRIMARY KEY (`id`));
  
/* --- FOREIGN KEYS --- */  

/* --- landlords --- */

ALTER TABLE `rentalis_db`.`landlords` 
ADD INDEX `fk_users_landlords_idx` (`userId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`landlords` 
ADD CONSTRAINT `fk_users_landlords`
  FOREIGN KEY (`userId`)
  REFERENCES `rentalis_db`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `rentalis_db`.`landlords` 
ADD INDEX `fk_users2_landlords_idx` (`alsoHandledByUser` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`landlords` 
ADD CONSTRAINT `fk_users2_landlords`
  FOREIGN KEY (`alsoHandledByUser`)
  REFERENCES `rentalis_db`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  /* --- contracts --- */

ALTER TABLE `rentalis_db`.`contracts` 
ADD INDEX `fk_landlords_contracts_idx` (`landlordId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`contracts` 
ADD CONSTRAINT `fk_landlords_contracts`
  FOREIGN KEY (`landlordId`)
  REFERENCES `rentalis_db`.`landlords` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `rentalis_db`.`contracts` 
ADD INDEX `fk_tenants_contracts_idx` (`tenantId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`contracts` 
ADD CONSTRAINT `fk_tenants_contracts`
  FOREIGN KEY (`tenantId`)
  REFERENCES `rentalis_db`.`tenants` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `rentalis_db`.`contracts` 
ADD INDEX `fk_properties_contracts_idx` (`propertyId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`contracts` 
ADD CONSTRAINT `fk_properties_contracts`
  FOREIGN KEY (`propertyId`)
  REFERENCES `rentalis_db`.`properties` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

/* --- tenants --- */

ALTER TABLE `rentalis_db`.`tenants` 
ADD INDEX `fk_landlords_tenants_idx` (`landlordId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`tenants` 
ADD CONSTRAINT `fk_landlords_tenants`
  FOREIGN KEY (`landlordId`)
  REFERENCES `rentalis_db`.`landlords` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

/* --- rents --- */

ALTER TABLE `rentalis_db`.`rents` 
ADD INDEX `fk_contracts_rents_idx` (`contractId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`rents` 
ADD CONSTRAINT `fk_contracts_rents`
  FOREIGN KEY (`contractId`)
  REFERENCES `rentalis_db`.`contracts` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

/* --- expenses --- */

ALTER TABLE `rentalis_db`.`expenses` 
ADD INDEX `fk_contracts_expenses_idx` (`contractId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`expenses` 
ADD CONSTRAINT `fk_contracts_expenses`
  FOREIGN KEY (`contractId`)
  REFERENCES `rentalis_db`.`contracts` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

/* --- payments --- */

ALTER TABLE `rentalis_db`.`payments` 
ADD INDEX `fk_contracts_payments_idx` (`contractId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`payments` 
ADD CONSTRAINT `fk_contracts_payments`
  FOREIGN KEY (`contractId`)
  REFERENCES `rentalis_db`.`contracts` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

/* --- properties --- */

ALTER TABLE `rentalis_db`.`properties` 
ADD INDEX `fk_landlords_properties_idx` (`landlordId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`properties` 
ADD CONSTRAINT `fk_landlords_properties`
  FOREIGN KEY (`landlordId`)
  REFERENCES `rentalis_db`.`landlords` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

/* --- tasks --- */

ALTER TABLE `rentalis_db`.`tasks` 
ADD INDEX `fk_properties_tasks_idx` (`propertyId` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`tasks` 
ADD CONSTRAINT `fk_properties_tasks`
  FOREIGN KEY (`propertyId`)
  REFERENCES `rentalis_db`.`properties` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `rentalis_db`.`tasks` 
ADD INDEX `fk_users_taks_idx` (`handledBy` ASC) VISIBLE;
;
ALTER TABLE `rentalis_db`.`tasks` 
ADD CONSTRAINT `fk_users_taks`
  FOREIGN KEY (`handledBy`)
  REFERENCES `rentalis_db`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

/* --- FIN --- */