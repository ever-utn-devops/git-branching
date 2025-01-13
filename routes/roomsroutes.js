'use strict';
var _ = require('underscore');

module.exports = function(app) {
  var rooms = require('../controllers/RoomController');
  var auth = require('../controllers/AuthController');

  // todoList Routes
  app.route('/rooms')
    .get(rooms.list_all_rooms)
  
  app.route('/rooms/booking')
    .put(rooms.booking)
  
  app.route('/rooms/unbooking')
    .put(rooms.unbooking)

  app.route('/rooms/:roomName')
     .get(rooms.read_a_room)

  //app.route('/api/auth/:username/:password')
  app.route('/users/auth')
     .post(auth.authUser);
  
  app.route('/users')
     .get(auth.getUsers);
};