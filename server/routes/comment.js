const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

const commentController = require('../controllers/comment.js');

router.use(bodyParser.json());

module.exports = function(app) {

  //Crud
  router.post('/comment/create', (req, res, next) => {
    commentController.create(req)
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
  router.get('/comment/list/:type/:parent_id', (req, res, next) => {
    commentController.list(req.params.type, req.params.parent_id)
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
  router.get('/comment/get/:id', (req, res, next) => {
    commentController.get(req.params.id)
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
  router.delete('/comment/delete/:id', (req, res, next) => {
    let id = req.params.id

    commentController.delete(id)
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
