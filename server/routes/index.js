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
  require('./comment')(app);
  require('./news')(app);
  require('./contact')(app);
  app.use(router)
}
