const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

const okrController = require('../controllers/okr.js');

router.use(bodyParser.json());

module.exports = function(app) {

  /*
   * OKR
   */

   app.get('/okr/list/ownerof/:user_id', (req, res) => {
     okrController.listOwnerOf(req.params.user_id)
     .then((data) => {
       res.send(data)
     })
     .catch((err) => {
       res.send({
         err: err
       })
     })
   })

   app.get('/okr/company_list/main/:company_id', (req, res) => {
     okrController.list({
       main: true,
       company_id: req.params.company_id
     })
     .then((data) => {
       res.send(data)
     })
     .catch((err) => {
       res.send({
         err: err
       })
     })
   })
  app.get('/okr/company_list/:company_id', (req, res) => {
    okrController.list({
      company_id: req.params.company_id
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })


  // Fetch single account
  app.get('/okr/get/:type/:id', (req, res) => {

    let id = req.params.id
    let type = req.params.type
    okrController.get(type, id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  // Fetch single account
  app.post('/okr/create', (req, res) => {
    okrController.create(req)
    .then((data) => {
      res.send({
        success: true,
        okr: data
      })
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  app.use(router)
}
