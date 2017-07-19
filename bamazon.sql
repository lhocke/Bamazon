DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id INT AUTO_INCREMENT,
product_name VARCHAR(1000) NULL,
department_name VARCHAR(1000) NULL,
price DECIMAL(10, 2),
stock_quantity DECIMAL(10, 2),
PRIMARY KEY(id)
);

SELECT * FROM products;