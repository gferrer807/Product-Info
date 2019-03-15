const db = require("../database/models.js");
const redis = require('redis');
const redisUrl = 'redis://localhost:6379';
const client = redis.createClient(redisUrl);

module.exports = {
  getProductInfo: (req, res) => {
    // let id = req.params["productId"];
    let id = req.params.id;
    /* **********
    REDIS CACHING
    ********** */

    //Do we have any cached data in redis
    //related to this query
    client.get(id, (err, val) => {
      if (val !== null) {
        console.log('Serving from redis');
        res.send(val);
      } else if (val === null) {
        db.getProductInfo(id, (err, data) => {
          console.log('Serving from POSTGRES')
          if (err) {
            console.log(err);
            res.sendStatus(501);
          } else {
            let productDetails = data[0]; //
            //console.log(data[0], ' - data being retrieved');
            //console.log('this is the productDetails', productDetails);
            productDetails["primary_images"] = [];
    
            data.forEach(row => {
              //console.log('one of the data rows - ', row);
              productDetails["primary_images"].push(row["imgurl"]);
            });
            client.set(id, JSON.stringify(productDetails));
            res.send(productDetails);
          }
        });
      }
    })
    /* **********
      **********
    ********** */

  },

  getColorOptions: (req, res) => {
    // let id = req.params["productId"];
    let redisId = req.params.id+"color";
    let id = req.params.id;
    client.get(redisId, (err, val) => {
      if (val !== null) {
        console.log('Serving from redis')
        res.send(val);
      } else if (val === null) {
        db.getColorOptions(id, (err, data) => {
          if (err) {
            console.log(err);
            res.sendStatus(501);
          } else {
            client.set(redisId, JSON.stringify(data))
            res.send(data);
          }
        });
      }
    });
  },

  getSizeOptions: (req, res) => {
    // let id = req.params["productId"];
    let redisId = req.params.id+"size";
    let id = req.params.id;
    client.get(redisId, (err, val) => {
      if (val !== null) {
        console.log('Serving from redis')
        res.send(val);
      } else if (val === null) {
        db.getSizeOptions(id, (err, data) => {
          if (err) {
            console.log(err);
            res.sendStatus(501);
          } else {
            client.set(redisId, JSON.stringify(data))
            res.send(data);
          }
        });
      }
    });
  }
};
