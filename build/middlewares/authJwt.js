"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config = require("../config/auth.config.js");
var User = require("../models/user.model");
var Role = require("../models/role.model");
var TokenExpiredError = jwt.TokenExpiredError;
// const catchError = (req: any, res: Response) => {;
//   if (err instanceof TokenExpiredError) {
//     return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
//   }
//
//   return res.sendStatus(401).send({ message: "Unauthorized!" });
// }
var verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};
var isAdmin = function (req, res, next) {
    User.findById(req.userId).exec(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find({
            _id: { $in: user.roles }
        }, function (err, roles) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!" });
            return;
        });
    });
};
var isModerator = function (req, res, next) {
    User.findById(req.userId).exec(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find({
            _id: { $in: user.roles }
        }, function (err, roles) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role!" });
            return;
        });
    });
};
exports.authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator
};
