/**
 * DoctorController
 *
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var request = require("request");
var rp = require('request-promise');

module.exports = {
	getList: function (req, res) {
         Doctor.list(req.body, function (err, data) {
            if (err) {
                res.forbidden();
            } else {
                res.json(data);

            }
        });
    },
    getDoctorDetail: function (req, res) {

        var docId = req.param('id');
        if (docId) {
            Doctor.doctorDetail(docId, function (err, data) {
                if (err) {
                    res.forbidden();
                    //res.send(err);
                } else {
                    res.json(data);
                }
            });
        } else {
            res.json({errorType: "UserID", errorMessage: "User ID is missing"});
        }

    },

    add: function (req, res) {
         Doctor.add(req.body, function (err, data) {
            if (err) {
                res.forbidden();
            } else {
                res.json(data);
                // res.redirect('/user/allFamily');
            }
        });
    },

    edit: function (req, res) {
        var docId = req.param('id');
        if (docId) {
            return Doctor.edit(docId, req.body, function (err, data) {
                if (err) {
                    res.forbidden();
                } else {
                    res.json(data);
                }
            });
        } else {
            res.json({errorType: "DoctorID", errorMessage: "ID is missing"});
        }
    },


    delete: function (req, res) {
        var Id = req.param('id');
        if (Id) {
            return Doctor.delete(Id, function (err, data) {
                if (err) {
                    res.forbidden();
                } else {
                    res.json("Deleted Successfully");
                }
            });
        } else {
            res.json({errorType: "DoctorID", errorMessage: "ID is missing"});
        }
    }
};

