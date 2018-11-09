const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

const newsController = require('../controllers/news.js');

router.use(bodyParser.json());

module.exports = function(app) {
  router.post('/news/create', (req, res, next) => {
    console.log('create')
    newsController.create(req)
      .then((data) => {
        console.log(data)
        res.send(data)
      })
      .catch((err) => {
        res.send({
          err: err
        })
      })
  })

  router.get('/news/list/:company_id', (req, res, next) => {
    newsController.list(req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })


  router.get('/news/get/:id', (req, res, next) => {
    newsController.get(req.params.id)
    .then((data) => {
      res.send(data)
    })
    .then((err) => {
      res.send({
        err: err
      })
    })
  });

  router.post('/news/update/:id', (req, res, next) => {
    let id = req.params.id
    newsController.update(id, req)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send({
        err: err
      })
    })
  })

  router.get('/news/delete/:id', (req, res, next) => {
    let id = req.params.id

    newsController.delete(id)
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
