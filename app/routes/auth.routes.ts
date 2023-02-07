const {checkDuplicateUsernameOrEmail, checkRolesExisted} = require("../middlewares/verifySignUp");

const controller = require("../controllers/auth.controller");

module.exports = function(app: any) {
  app.post("/api/auth/refreshtoken", controller.refreshToken);
};

module.exports = function(app: any) {
  app.use(function(req: any, res: any, next: any) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
   [
      checkDuplicateUsernameOrEmail,
      checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post('/logout', controller.logout)
};
