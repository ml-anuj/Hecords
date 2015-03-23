/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  login : function(req, res){
    if(!req.body || !req.body.email || !req.body.password)
      res.badRequest('Email or password missing in request');
    else{
      User.login(req.body, function(err, user){
        if(err){
          res.serverError(err);
         }
        else{
          req.session.authenticated = true;
          req.session.user = user;
          res.json("You are logged in");
          // console.log(req.session.user);
        }   
      });
    }
  },

  signUp : function(req, res){
    if(!req.body || !req.body.email || !req.body.password)
      res.badRequest('Email or password missing in request');
    else{
      User.signUp(req.body, function(err, user){
        if(err)
          res.serverError(err);
            else{
              
                res.json(user);
            }   
      });
    }
  },

  getList: function (req, res) {
         User.userList(req.body, function (err, data) {
            if (err) {
                res.forbidden();
            } else {
                res.json(data);

            }
        });
    },
    getUserDetail: function (req, res) {

        var userId = req.param('id');
        if (userId) {
            User.userDetail(userId, function (err, data) {
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
         User.addUser(req.body, function (err, data) {
            if (err) {
                res.forbidden();
            } else {
                // res.json(fam);
                res.redirect('/user/allFamily');
            }
        });
    },

    edit: function (req, res) {
        var userId = req.param('id');
        if (userId) {
            return User.editUser(userId, req.body, function (err, data) {
                if (err) {
                    res.forbidden();
                } else {
                    res.json(data);
                }
            });
        } else {
            res.json({errorType: "UserID", errorMessage: "User ID is missing"});
        }
    },


    delete: function (req, res) {
        var userId = req.param('id');
        if (userId) {
            return User.deleteUser(userId, function (err, data) {
                if (err) {
                    res.forbidden();
                } else {
                    res.json(data);
                }
            });
        } else {
            res.json({errorType: "UserID", errorMessage: "UserID is missing"});
        }
    }

  

};

