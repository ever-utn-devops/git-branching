'use strict';
var _ = require('underscore');

module.exports = function(app) {
  var rooms = require('../controllers/RoomController');
  var auth = require('../controllers/AuthController');

  // todoList Routes
  app.route('/rooms')
    .get(rooms.list_all_rooms)

  app.route('/unbooking')
    .put(rooms.unbooking)
  
  app.route('/users')
    .get(auth.getUsers);

  app.route('/rooms/:roomName')
    .get(rooms.read_a_room)
};

