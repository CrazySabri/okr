const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

const companyController = require('../controllers/company.js');

router.use(bodyParser.json());

module.exports = function(app) {

  //Crud
  router.post('/company/create', (req, res, next) => {
    companyController.create({
      name: req.body.name,
      ownerId: req.body.ownerId,
      code: req.body.code
    })
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
  router.get('/company/list/member_of/:user_id', (req, res, next) => {
    companyController.listMemberOf(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });

  router.get('/company/members/:company_id', (req, res, next) => {
    companyController.listMembers(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  router.get('/company/teams/:company_id', (req, res, next) => {
    companyController.listTeams(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  //cRud
  router.get('/company/get/:id', (req, res, next) => {
    companyController.get(req.params.id)
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
  router.get('/company/getbycode/:code', (req, res, next) => {
    companyController.getbycode(req.params.code)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });

  router.get('/company/hascompany/code/:code', (req, res, next) => {
    companyController.getbycode(req.params.code)
    .then((data) => {
      if(data) {
        res.send(true)
      } else {
        res.send(false)
      }
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  router.put('/company/update/:id', (req, res, next) => {
    let id = req.params.id

    companyController.update(id, req)
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
  router.delete('/company/delete/:id', (req, res, next) => {
    let id = req.params.id

    companyController.delete(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  });

  app.use(router);
}
