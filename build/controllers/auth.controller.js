"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("../config/auth.config");
var User = require("../models/user.model");
var Role = require("../models/role.model");
var RefreshToken = require("../models/refreshToken.model");
var redis = require('redis');
var JWTR = require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = function (req, res) {
    console.log(req.body);
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        iin: req.body.email,
        avatar: req.body.email,
    });
    user.save(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            }, function (err, roles) {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = roles.map(function (role) { return role._id; });
                user.save(function (err) {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
        else {
            Role.findOne({ name: "user" }, function (err, role) {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(function (err) {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};
exports.signin = function (req, res) {
    User.findOne({
        username: req.body.username,
    })
        .populate("roles", "-__v")
        .exec(function (err, user) { return __awaiter(void 0, void 0, void 0, function () {
        var passwordIsValid, token, refreshToken, authorities, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err) {
                        res.status(500).send({ message: err });
                        return [2 /*return*/];
                    }
                    if (!user) {
                        return [2 /*return*/, res.status(404).send({ message: "User Not found." })];
                    }
                    passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                    if (!passwordIsValid) {
                        return [2 /*return*/, res.status(401).send({
                                accessToken: null,
                                message: "Invalid Password!",
                            })];
                    }
                    token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: config.jwtExpiration,
                    });
                    return [4 /*yield*/, RefreshToken.createToken(user)];
                case 1:
                    refreshToken = _a.sent();
                    authorities = [];
                    for (i = 0; i < user.roles.length; i++) {
                        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
                    }
                    res.status(200).send({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        roles: authorities,
                        accessToken: token,
                        refreshToken: refreshToken,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestToken, refreshToken, newAccessToken, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestToken = req.body.refreshToken;
                if (requestToken == null) {
                    return [2 /*return*/, res.status(403).json({ message: "Refresh Token is required!" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, RefreshToken.findOne({ token: requestToken })];
            case 2:
                refreshToken = _a.sent();
                if (!refreshToken) {
                    res.status(403).json({ message: "Refresh token is not in database!" });
                    return [2 /*return*/];
                }
                if (RefreshToken.verifyExpiration(refreshToken)) {
                    RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
                    res.status(403).json({
                        message: "Refresh token was expired. Please make a new signin request",
                    });
                    return [2 /*return*/];
                }
                newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
                    expiresIn: config.jwtExpiration,
                });
                return [2 /*return*/, res.status(200).json({
                        accessToken: newAccessToken,
                        refreshToken: refreshToken.token,
                    })];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).send({ message: err_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        jwtr.destroy(req.header.Authorization);
        return [2 /*return*/];
    });
}); };
