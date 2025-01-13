'use strict';
var _ = require('underscore');

module.exports = function(app) {
  var rooms = require('../controllers/RoomController');
  var auth = require('../controllers/AuthController');

  // todoList Routes
  app.route('/rooms')
    .get(rooms.list_all_rooms)
  
};