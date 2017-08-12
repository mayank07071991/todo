var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var user = require('../models/user'); // get our mongoose model
var todo = require('../models/todo')
var registrationLogin = require('../routes/registrationLogin')
var jwtVerify = require('../routes/jwtVerify')

var todoRoutes = express.Router()

todoRoutes.use(function(req, res, next) {
    jwtVerify(req, res, next)
})

todoRoutes.post('/createTodo', function(req, res) {
    if (!req.body.name) {
        res.json({
            success: false,
            msg: "Data not provided"
        })
    } else {
        var newTodo = new todo({
            email: req.decoded._doc.email,
            name: req.body.name
        })
        newTodo.save(function(err, data) {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: "Database error"
                })
            } else {
                res.json({
                    success: true,
                    data: data,
                    decoded: req.decoded
                })
            }
        })
    }
})

todoRoutes.get('/todo', function(req, res) {
    todo.find({ email: req.decoded._doc.email }, { email: 0 }, function(err, data) {
        if (err) res.status(500).json({
            success: false,
            msg: "Database error"
        })

        else {
            res.json({
                success: true,
                data: data
            })
        }
    })

})

todoRoutes.post('/checkTodo', function(req, res) {
    if (!req.body._id) {
        res.json({
            success: false,
            msg: "Data not provided"
        })
    } else {
        todo.findById({ _id: req.body._id }, function(err, data) {
            if (err) res.status(500).json({
                success: false,
                msg: "Database error"
            })

            else {
                data.status = 'done'
                data.completed_date = new Date()
                data.save(function(err, newData) {
                    if (err) res.status(500).json({
                        success: false,
                        msg: "Database error"
                    })
                    else {
                        res.json({
                            success: true,
                            data: newData
                        })
                    }
                })
            }
        })
    }
})


todoRoutes.post('/delete', function(req, res) {
    if (!req.body._id) {
        res.json({
            sucess: false,
            msg: "data not provided"
        })
    } else {
        todo.remove({ _id: req.body._id }, function(err) {
            if (err) res.status(500).json({
                success: false,
                msg: "database error"
            })

            else {
                res.json({
                    sucess: true,
                    msg: "todo deleted"
                })
            }

        })
    }
})

todoRoutes.post('/update', function(req, res) {
    if (!req.body._id) {

        res.json({
            sucess: false,
            msg: "data not provided"
        })
    } else {
        var _id = req.body._id;
        var newTodo = { 'name': req.body.name, 'email': req.decoded._doc.email, '_id': _id }
        todo.findOneAndUpdate({ _id: _id }, { $set: newTodo }, { new: true }, function(err, data) {
            if (err) res.status(500).json({
                sucess: false,
                msg: "database error"
            })

            else {
              res.json ({
                sucess: true,
                msg: "todo updated",
                data: data
              })
            }  
        })
    }
})




module.exports = todoRoutes