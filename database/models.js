const {Pool} = require('pg');

//DB configuration
var pool = new Pool ({
  host: 'ec2-3-18-35-125.us-east-2.compute.amazonaws.com',
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
    pool.query(`SELECT DISTINCT var_name, imgurl FROM variations v
            WHERE v.id_options = (SELECT id FROM options o 
            where o.id_products = ${id} AND o.option_name = 'color')`, (err, res) => {
      if (err) {
        callback(err);
      } else {
        console.log(res, ' -res');
        callback(null, res.rows);
        //console.log('here is the res', res.rows[0]);
      }
    });
  },
  getSizeOptions: (id, callback) => {
    pool.query(`SELECT DISTINCT var_name, imgurl FROM variations v
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
