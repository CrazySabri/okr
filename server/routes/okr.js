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


   app.get('/okr/list/type/:type/:id', (req, res) => {
     okrController.list({
       id: req.params.id,
       type: req.params.type
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

  // Fetch single account
  app.post('/okr/update/:id', (req, res) => {
    okrController.update(req)
    .then((data) => {
      res.send({
        updated: true,
        okr: data
      })
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  app.post('/okr/update/status/:id', (req, res) => {
    okrController.updateStatus(req)
    .then((data) => {
      res.send({
        updated: true,
        okr: data
      })
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  // Fetch single rapport
  app.get('/okr/rapport/get/:id', (req, res) => {

    okrController.getOneRapport(req.params.id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  // Fetch all rapport by okr id
  app.get('/okr/rapport/list/:okr_id', (req, res) => {

    okrController.getOkrRapports(req.params.okr_id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  // Fetch all rapport by okr id
  app.get('/okr/rapport/one/:id', (req, res) => {

    okrController.getOkrRapport(req.params.id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  // Create single rapport
  app.post('/okr/rapport/create', (req, res) => {

    okrController.createRapport(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  // Update single rapport
  app.get('/okr/rapport/update/:id', (req, res) => {

    okrController.updateRapport(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  // Fetch single rapport
  app.post('/okr/rapport/remove', (req, res) => {

    okrController.removeRapport(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  app.use(router)
}
