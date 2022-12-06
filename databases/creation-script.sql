CREATE DATABASE eCommerce;
USE eCommerce;
CREATE table products;

CREATE TABLE `eCommerce`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `timestamp` INT NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `código` INT NOT NULL,
  `precio` INT NULL,
  `foto` VARCHAR(45) NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`));
