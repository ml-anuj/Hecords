/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


var crypto     = require('crypto');

module.exports = {

  attributes: {

    email: {
      type: 'email',
      required: true,
      minLength: 5
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8
    },
    name: {
      type: 'string', 
      required: true
    },
    gender: {
      type: 'string',
     required: true 
   },
    age: {
      type: 'string', 
      required: true },
    bloodGroup: {
      type: 'string', 
      required: true }

  },
login : function(opts, cb){
      User.findOne({where:{email:opts.email}}).exec(function(err, user){
        if(err)
          cb(err);
        else if(user){
            validatePassword(opts.password,user.password,function(res){
              if(res){
                delete user['password'];
                cb(null,user);
              }
              else{
                cb("Email or password does not match");
              }
            });
          }
          else{
            cb("user does not exist");
          } 
      });
    },

signUp : function(opts,cb){
    User.findOne({where:{email:opts.email}}).exec(function(err, user){
        if(err)
          cb(err);
        else if(!user){
              saltAndHash(opts.password,function(hash){
                opts.password = hash;
                User.create(opts, function(err, user){
              if(err)
                cb(err);
              else{
                delete user['password'];
                cb(null, user);
              }
          });
          })
          
        }
            else{
              cb("User Already exists", null);
            }   
      });
    }
//add user
  userList: function (req, callback) {
    User.find().exec(function (err, family) {
      if (!err) {
        return callback(null, family);

      } else {
        return callback(err, {"status": "failed"});
      }
    });
  },

  userDetail: function (uid, callback) {
    User.find({userId: uid}).exec(function (err, data) {
      if (!err) {
        if (data.length == 0) {

          callback(null, {errorType: "User Details", errorMessage: "No User with this ID"});

        } else {

          callback(null, data);
        }
      } else {
          return callback(err, {"status": "failed"});
        }
    });
  },

  addUser: function (data, callback) {
      User.create(data).exec(function (err, userData) {
          if (!err) {
              return callback(null, userData);

          } else {
              return callback(err, {"status": "failed"});
          }
      });
  },

  editUser: function (uid, req, callback) {
      User.update({userId: uid}, req, function (err, userData) {
          if (!err) {
              if (userData.length == 0) {
                  return callback(null, {errorType: "Family Member Details", errorMessage: "cann't edit ! No Details with this ID"});
              } else {
                  return callback(null, userData);
              }

          } else {
              return callback(err, {"status": "failed"});
          }
      });    
  },


 deleteUser: function (uid, callback) {
      User.destroy({userId: uid}).exec(function (err, data) {
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
//password encryption

var generateSalt = function(){
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
      var p = Math.floor(Math.random() * set.length);
      salt += set[p];
    }
    return salt;
}

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback){
    var salt = generateSalt();
    callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback){
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(hashedPass === validHash);
}
