const path = require('path');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(path.join(__dirname,'./amazon.db'));

db.serialize(function() {
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(100) NULL DEFAULT NULL,
    company VARCHAR(50) NULL DEFAULT NULL,
    catagory VARCHAR(50) NULL DEFAULT NULL,
    price DECIMAL(1000) NULL DEFAULT NULL,
    stockCount INT(20) NULL DEFAULT NULL,
    best_seller SMALLINT(1) NULL DEFAULT NULL,
    rating DECIMAL(10) NULL DEFAULT NULL,
    review_count BIGINT(1000) NULL DEFAULT NULL,
    question_count BIGINT(1000) NULL DEFAULT NULL
  )`);

  db.run(`CREATE TABLE primary_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_name VARCHAR(20) NULL DEFAULT NULL,
    imgUrl VARCHAR(100) NULL DEFAULT NULL,
    id_products INTEGER NULL DEFAULT NULL,
    FOREIGN KEY(id_products) REFERENCES products(id)
    )`);

  db.run(`CREATE TABLE options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(20) NULL DEFAULT NULL,
    option_name VARCHAR(20) NULL DEFAULT NULL,
    id_products INTEGER NULL DEFAULT NULL,
    FOREIGN KEY(id_products) REFERENCES products(id)
    )`);

  db.run(`CREATE TABLE variations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    var_name VARCHAR(20) NULL DEFAULT NULL,
    imgUrl VARCHAR(100) NULL DEFAULT NULL,
    id_options INTEGER NULL DEFAULT NULL,
    id_products INTEGER NULL DEFAULT NULL,
    FOREIGN KEY(id_options) REFERENCES options(id)
    FOREIGN KEY(id_products) REFERENCES products(id)
  `);
});