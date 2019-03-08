const db = require("../database/models.js");

module.exports = {
  getProductInfo: (req, res) => {
    // let id = req.params["productId"];
    let id = req.params.id;

    db.getProductInfo(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        let productDetails = data[0];
        console.log(data, ' - data');
        console.log('this is the productDetails', productDetails);
        productDetails["primary_images"] = [];

        data.forEach(row => {
          productDetails["primary_images"].push(row["imgUrl"]);
        });
        res.send(productDetails);
      }
    });
  },

  getColorOptions: (req, res) => {
    // let id = req.params["productId"];
    let id = req.params.id;

    db.getColorOptions(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        res.send(data);
      }
    });
  },

  getSizeOptions: (req, res) => {
    // let id = req.params["productId"];
    let id = req.params.id;

    db.getSizeOptions(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(501);
      } else {
        res.send(data);
      }
    });
  }
};
