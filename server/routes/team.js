const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

const teamController = require('../controllers/team.js');

router.use(bodyParser.json());

module.exports = function(app) {

  //Crud
  router.post('/team/create', (req, res, next) => {
    teamController.create(req)
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
  router.get('/team/list', (req, res, next) => {
    teamController.list(req)
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
  router.get('/team/get/:user_id/:id', (req, res, next) => {
    teamController.get(req.params.user_id, req.params.id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });


  router.put('/team/update/:id', (req, res, next) => {
    let id = req.params.id

    teamController.update(id, req)
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
  router.delete('/team/delete/:id', (req, res, next) => {
    let id = req.params.id

    teamController.delete(id)
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
