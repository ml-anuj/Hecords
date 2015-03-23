/**
* FamilyMember.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
// var mongodb = require('mongodb');
//var BSON = mongo.BSONPure;

module.exports = {

  	attributes: {
        "isAuthorized": {type:'boolean'},
		"name": {type: 'string', required: true},
	    "gender": {type: 'string', required: true },
	    "age": {type: 'string', required: true },
	    "bloodGroup": {type: 'string', required: true },
        "email":{type: 'string', required: true}
  	},

  	familyList: function (req, callback) {
        FamilyMember.find().exec(function (err, data) {
            if (!err) {
                return callback(null, data);

            } else {
                return callback(err, {"status": "failed"});
            }
        });
  	},

  	MemberDetail: function (uid, callback) {
        FamilyMember.find({id: uid}).exec(function (err, data) {
            if (!err) {
                if (data.length == 0) {
                     callback(null, {errorType: "FamilyMember Details", errorMessage: "No FamilyMember with this ID"});
                } else {
                     callback(null, data);
                }

            } else {
                return callback(err, {"status": "failed"});
            }
        });
  	},

  	add: function (data, callback) {
        FamilyMember.create(data).exec(function (err, memberData) {
            if (!err) {
                if(memberData.isAuthorized){
                    User.create(data).exec(function (err, userData){
                        if(!err){
                            return callback(null, userData)
                        } else{
                            return callback(err, {"status": "failed"});
                        }
                    });
                } else{
                    return callback(null, memberData);
                }
                   
            } else {
                return callback(err, {"status": "failed"});

            }
        });
    },

	edit: function (mid, req, callback) {
		// sails.log.debug(uid);
        FamilyMember.update({id : mid}, req, function (err, data) {
            if (!err) {
                if (data.length == 0) {
                    return callback(null, {errorType: "Family Member Details", errorMessage: "cann't edit ! No Details with this ID"});
                } else {
                    return callback(null, data);
                }

            } else {
                return callback(err, {"status": "failed"});
            }
        });
    },


    delete: function (uid, callback) {
        FamilyMember.destroy({id: uid}).exec(function (err, data) {
            if (!err) {
                if (data.length == 0) {
                    return callback(null, {errorType: "Family Details", errorMessage: "cann't delete ! No Family Member with this ID"});
                } else {
                    return callback(null, data);
                }
            } else {
                return callback(err, {"status": "failed"});
            }
        });
    }
};

