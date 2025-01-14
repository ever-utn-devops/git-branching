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

exports.read_a_room = function(req, res) {
    let httpCode=0;
    let result= {};
    
    if (req.params.roomName === undefined || req.params.roomName === null){
        httpCode=httpresponse.BAD_REQUEST
        result = {
            data: null,
            responseCode: endpointresponse.MISSING_PARAMETERS,
            message: 'You must send the room as parameter.'
        };
    }else{
        let room = model.getById(req.params.roomName );
        if (room.length > 0){
            httpCode=httpresponse.OK
            result = {
                data: room[0],
                responseCode: endpointresponse.INFO_FOUND,
                message: sucess_meg
            };
        }else{
            httpCode=httpresponse.BAD_REQUEST
            result = {
                data: null,
                responseCode: endpointresponse.INFO_NOT_FOUND,
                message: 'Room not found.'
            };
        }
    }
    
    res.status(httpCode).send(result);
};

exports.booking = function(req, res){
    let httpCode=0;
    let result= {};
    if (req.body.username === undefined || req.body.room === undefined || req.body === null || req.body.length === 0 || req.body === ''){
        httpCode=httpresponse.BAD_REQUEST
        result = {
            data: null,
            responseCode: endpointresponse.MISSING_PARAMETERS,
            message: 'Must provide the room and the username to book a room.'
        };
    }else{
        let room = model.getById(req.body.room);
        if (room.length > 0){
            if (!room[0]['is_busy']){
                let currentDate = new Date();
                let formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;    
                let roomupdated = model.update(req.body.room, true, req.body.username, formattedDate)
                if (roomupdated == null){
                    
                }else{
                    httpCode=httpresponse.OK
                    result = {
                        data: roomupdated,
                        responseCode: endpointresponse.SUCESSFUL,
                        message: sucess_meg
                    };
                }
            }else{
                httpCode=httpresponse.BAD_REQUEST
                result = {
                    data: null,
                    responseCode: endpointresponse.INFO_NOT_FOUND,
                    message: 'The room cannot be booked, it has been booked previously.'
                };
            }            
        }else{
            httpCode=httpresponse.BAD_REQUEST
            result = {
                data: null,
                responseCode: endpointresponse.INFO_NOT_FOUND,
                message: 'Room not found.'
            };
        }
    }
    res.status(httpCode).send(result);
};

exports.unbooking = function(req, res){
    let httpCode=0;
    let result= {};
    if (req.body.room === undefined || req.body === null || req.body.length === 0 || req.body === ''){
        httpCode=httpresponse.BAD_REQUEST
        result = {
            data: null,
            responseCode: endpointresponse.MISSING_PARAMETERS,
            message: 'Must provide the room to cancel the booking.'
        };
    }else{
        let room = model.update(req.body.room, false, '', null)
        if (room == null){
            httpCode=httpresponse.BAD_REQUEST
            result = {
                data: null,
                responseCode: endpointresponse.INFO_NOT_FOUND,
                message: 'Room not found.'
            };
        }else{
            httpCode=httpresponse.OK
            result = {
                data: room,
                responseCode: endpointresponse.SUCESSFUL,
                message: sucess_meg
            };
        }
        
    }
    res.status(httpCode).send(result);
};