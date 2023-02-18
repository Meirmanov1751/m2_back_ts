import { Request, Response, Express, NextFunction } from 'express';

const authJwt = require("../middlewares/authJwt")
const controller = require("../controllers/user.controller")

module.exports = function(app: Express) {
  app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/user/me", [authJwt.verifyToken], controller.getMe);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
