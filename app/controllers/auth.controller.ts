require("dotenv").config()
const config = require("../config/auth.config")
const User = require("../models/user.model");
const Role = require("../models/role.model");
const RefreshToken = require("../models/refreshToken.model")

import {NextFunction, Request, Response} from 'express';
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req: Request, res: Response) => {
  console.log(req.body)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    iin: req.body.email,
    avatar: req.body.email,
  });

  user.save((err: Error, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
       {
          name: { $in: req.body.roles }
      },
     (err: Error, roles: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
         }

         user.roles = roles.map((role: any) => role._id);
        user.save((err: Error) => {
          if (err) {
               res.status(500).send({ message: err });
              return;
             }

             res.send({ message: "User was registered successfully!" });
           });
         }
       );
     } else {
       Role.findOne({ name: "user" }, (err: Error, role: any) => {
         if (err) {
           res.status(500).send({ message: err });
           return;
         }

         user.roles = [role._id];
         user.save((err: Error)=> {
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

exports.signin = (req: Request, res: Response) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec(async (err: Error, user: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
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
    });
};

exports.refreshToken = async (req: Request, res: Response) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, process.env.SECRET, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  try{
    var decode = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({token});
    if(!user) {
      res.status(401).json({message: 'Invalid token'});
    }
    // Сброс токена в базе данных
    user.token = "";
    await user.save();
    res.json({message: 'Logout successful'});
  }catch (err) {
    res.status(401).json({message: 'Invalid token'});
  }
}

