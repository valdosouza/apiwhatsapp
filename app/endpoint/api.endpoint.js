const apiController = require('../controller/api.controller');

class ApiEndPoint {

  static open = (req, res) => {

    apiController.open(req.body)
      .then((data) => {        
        res.send({status: data.client.spinStatus.previousText});
      })
  };

  static sender = (req, res) => {
    apiController.open(req.body)
      .then(() => {
        apiController.sender(req.body)
          .then(data => {
            res.send(data);
          })
      });
  };

}

module.exports = ApiEndPoint;