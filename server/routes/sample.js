const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

const sampleController = require('../controllers/sample.js');

router.use(bodyParser.json());

module.exports = function(app) {

  //Crud
  router.post('/sample/create', (req, res, next) => {
    sampleController.create(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });

  //cRud
  router.get('/sample/list', (req, res, next) => {
    sampleController.list(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });

  //cRud
  router.get('/sample/get/:id', (req, res, next) => {
    sampleController.get(req.params.id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });


  router.put('/sample/update/:id', (req, res, next) => {
    let id = req.params.id

    sampleController.update(id, req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });

  //cruD
  router.delete('/sample/delete/:id', (req, res, next) => {
    let id = req.params.id

    sampleController.delete(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });

  app.use(router)
}
