var User = require("./../models/user.model");
var Role = require("./../models/role.model");
var checkDuplicateUsernameOrEmail = function (req, res, next) {
    // Username
    User.findOne({
        username: req.body.username
    }).exec(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
        // Email
        User.findOne({
            email: req.body.email
        }).exec(function (err, user) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }
            next();
        });
    });
};
var checkRolesExisted = function (req, res, next) {
    if (req.body.roles) {
        for (var i = 0; i < req.body.roles.length; i++) {
            if (!Role.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role ".concat(req.body.roles[i], " does not exist!")
                });
                return;
            }
        }
    }
    next();
};
exports.verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};
