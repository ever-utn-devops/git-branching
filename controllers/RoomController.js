'use strict';
var _ = require('underscore');
let model = require('../models/RoomModel');
var httpresponse = require('../util/httpResponse')
var endpointresponse = require('../util/endpointResponse')

var sucess_meg= 'Action executed sucessfully.'

exports.list_all_rooms = function(req, res) {  
    let data = model.get_rooms();
    let result = {
        data: data,
        responseCode: endpointresponse.SUCESSFUL,
        message: sucess_meg
    };
    res.status(httpresponse.OK).send(result);
};