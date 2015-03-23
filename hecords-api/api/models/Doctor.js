/**
* Doctor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

	"name": {type: 'string', required: true},
    "specialization": {type: 'string', required: true },
    "address": {type: 'string'},
    "gender": {type: 'string'},
    "phone": {type: 'int', required: true },
    "email":{type: 'string', required: true},
    "qualification":{type: 'string', required: true},
    "working at":{type: 'string'},
    "exp":{type: 'string'},


  },
    list: function (req, callback) {
        Doctor.find().exec(function (err, data) {
            if (!err) {
                return callback(null, data);

            } else {
                return callback(err, {"status": "failed"});
            }
        });
  	},

  	doctorDetail: function (uid, callback) {
        Doctor.find({id: uid}).exec(function (err, data) {
            if (!err) {
                if (data.length == 0) {
                     callback(null, {errorType: "Doctor Details", errorMessage: "No Doctor Found with this ID"});
                } else {
                     callback(null, data);
                }

            } else {
                return callback(err, {"status": "failed"});
            }
        });
  	},

  	add: function (data, callback) {
        Doctor.create(data).exec(function (err, doctorData) {
            if (!err) {        
                return callback(null, doctorData)             
            } else {
                return callback(err, {"status": "failed"});
            }
        });
    },

	edit: function (mid, req, callback) {
		// sails.log.debug(uid);
        Doctor.update({id : mid}, req, function (err, data) {
            if (!err) {
                if (data.length == 0) {
                    return callback(null, {errorType: "Doctor Details", errorMessage: "cann't edit ! No Details with this ID"});
                } else {
                    return callback(null, data);
                }

            } else {
                return callback(err, {"status": "failed"});
            }
        });
    },


    delete: function (uid, callback) {
        Doctor.destroy({id: uid}).exec(function (err, data) {
            if (!err) {
                if (data.length == 0) {
                    return callback(null, {errorType: "Doctor Details", errorMessage: "cann't delete ! No Entry with this ID"});
                } else {
                    return callback(null, data);
                }
            } else {
                return callback(err, {"status": "failed"});
            }
        });
    }



};

