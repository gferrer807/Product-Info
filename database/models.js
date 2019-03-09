/*
const sqlite = require("sqlite3").verbose();
const path = require("path");
let db = new sqlite.Database(path.join(__dirname, "./amazon.db"));

module.exports = {
  getProductInfo: (id, callback) => {
    db.serialize(() => {
      db.all(
        `SELECT * FROM products p
          INNER JOIN primary_images pi on p.id = pi.id_products
          WHERE p.id = ${id}`,
        function(err, data) {
          if (err) callback(err);
          else callback(null, data);
        }
      );
    });
  },

  getColorOptions: (id, callback) => {
    db.serialize(() => {
      db.all(
        ` SELECT DISTINCT var_name, imgUrl FROM variations v
          WHERE v.id_options = (SELECT id FROM options o 
            where o.id_products = ${id} AND o.option_name = "color")`,
        function(err, data) {
          if (err) callback(err);
          else callback(null, data);
        }
      );
    });
  },
  getSizeOptions: (id, callback) => {
    db.serialize(() => {
      db.all(
        `SELECT DISTINCT var_name, imgUrl FROM variations v
          WHERE v.id_options = (SELECT id FROM options o 
          where o.id_products = ${id} AND o.option_name = "size")`,
        function(err, data) {
          if (err) callback(err);
          else callback(null, data);
        }
      );
    });
  }
};

*/
const {Pool} = require('pg');

//DB configuration
var pool = new Pool ({
  host: 'localhost',
  user: 'postgres',
  password: 'Blunderb33!',
  database: 'amazon_component'
});

module.exports = {
  getProductInfo: (id, callback) => {
    pool.query(`SELECT * FROM products p
          INNER JOIN primary_images pi on p.id = pi.id_products
          WHERE p.id = ${id}`, (err, res) => {
      if (err) {
        console.log(err, ' -err');
        callback(err);
      } else {
        console.log(res, ' -res');
        callback(null, res.rows);
        //console.log('here is the res', res.rows[0]);
      }
    });
  },

  getColorOptions: (id, callback) => {
    pool.query(`SELECT DISTINCT var_name, imgUrl FROM variations v
          WHERE v.id_options = (SELECT id FROM options o 
            where o.id_products = ${id} AND o.option_name = 'color')`, (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res.rows);
        //console.log('here is the res', res.rows[0]);
      }
    });
  },
  getSizeOptions: (id, callback) => {
    pool.query(`SELECT DISTINCT var_name, imgUrl FROM variations v
          WHERE v.id_options = (SELECT id FROM options o 
          where o.id_products = ${id} AND o.option_name = 'size')`, (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res.rows);
        //console.log('here is the res', res.rows[0]);
      }
    });
  }
};
