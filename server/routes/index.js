const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

const sampleController = require('../controllers/sample.js');

router.use(bodyParser.json());

module.exports = function(app) {
  require('./sample')(app);
  require('./account')(app);
  require('./okr')(app);
  require('./company')(app);
  require('./team')(app);
  app.use(router)
}
