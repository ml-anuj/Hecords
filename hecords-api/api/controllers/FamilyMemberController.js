/**
 * FamilyMemberController
 *
 * @description :: Server-side logic for managing familymembers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var request = require("request");
var rp = require('request-promise');

module.exports = {

	getFamilyList: function (req, res) {
		// var id = req.session.user;
         FamilyMember.familyList(req.body, function (err, data) {
            if (err) {
                res.forbidden();
            } else {
                res.json(data);

            }
        });
    },

    getMemberDetail: function (req, res) {
        var memberId = req.param('id');
        if (memberId) {
            FamilyMember.MemberDetail(memberId, function (err, data) {
                if (err) {
                    res.forbidden();
                    //res.send(err);
                } else {
                    res.json(data);
                }
            });
        } else {
            res.json({errorType: "MemberID", errorMessage: "Member ID is missing"});
        }

    },

    add: function (req, res) {
        FamilyMember.add(req.body, function (err, data) {
            if (err) {
                res.forbidden();
            } else {
                // res.json(data);
                res.redirect('/user/allFamilyMember');
            }
        });
    },

    edit: function (req, res) {
        var memberId = req.param('id');
        if (memberId) {
            return FamilyMember.edit(memberId, req.body, function (err, data) {
                if (err) {
                    res.forbidden();
                } else {
                    res.json(data);
                }
            });
        } else {
            res.json({errorType: "MemberID", errorMessage: "Member ID is missing"});
        }
    },


    delete: function (req, res) {
        var memberId = req.param('id');
        if (memberId) {
            return FamilyMember.delete(memberId, function (err, data) {
                if (err) {
                    res.forbidden();
                } else {
                    res.json(data);
                }
            });
        } else {
            res.json({errorType: "MemberID", errorMessage: "MemberID is missing"});
        }
    }
};

