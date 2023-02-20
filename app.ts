import * as path from "path";
import {NextFunction, Request, Response} from 'express';

const express = require('express');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const formData = require("express-form-data");
const os = require("os");
require("dotenv").config();

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require("@adminjs/mongoose");

const {Role} = require("./app/models/role.model");
const {User} = require("./app/models/user.model");
const {Building} = require("./app/models/building.model");
const {Apartment} = require("./app/models/apartment.model")
const {City} = require("./app/models/city.model");
const {News} = require("./app/models/news.model");
const {RefreshToken} = require("./app/models/refreshToken.model");

const {ApartmentImages} = require("./app/resources/apartment.files");
const {BuildingImages} = require("./app/resources/building.files");
const {NewsImages} = require("./app/resources/news.files");

const cityRoutes = require('./app/routes/city.routes');
const newsRoutes = require('./app/routes/news.routes');
const newsImageRoutes = require('./app/routes/news.image.routes');
const buildingRoutes = require('./app/routes/building.routes');
const buildingImageRoutes = require('./app/routes/building.image.routes');
const apartmentRoutes = require('./app/routes/apartment.routes');
const apartmentImageRoutes = require('./app/routes/apartment.image.routes');

AdminJS.registerAdapter(AdminJSMongoose);
app.use(express.static(path.join(__dirname, './public')));


app.use(cors());
app.use(express.json())

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', cityRoutes);
app.use('/api', newsRoutes);
app.use('/api', newsImageRoutes);
app.use('/api', buildingRoutes);
app.use('/api', buildingImageRoutes);
app.use('/api', apartmentRoutes);
app.use('/api', apartmentImageRoutes);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = 8000;

app.get("/", (req: Request, res: Response) => {
  res.json({message: "Welcome to m2 application."});
});

const authenticate = async (email: string, password: any) => {
  if (email === process.env.EMAIL && password === process.env.PASSWORD) {
    return Promise.resolve({email: process.env.EMAIL, password: process.env.PASSWORD});
  };
  return null;
}

async function start() {
  const adminJs = new AdminJS({
    resources: [
      City, Building, BuildingImages, Apartment, ApartmentImages, User, Role, RefreshToken, {
        resource: News, options: {
          properties: {
            content: {
              type: 'richtext',
              isVisible: {list: false, filter: false, show: true, edit: true},
              custom: {
                modules: {
                  toolbar: [['bold', 'italic'], ['link', 'image']],
                },
              },
            }
          },
        },
      },NewsImages
    ],
    rootPath: "/admin",
  });
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );
// Build and use a router to handle AdminJS routes.
  const router = AdminJSExpress.buildRouter(adminJs, adminRouter);
  app.use(adminJs.options.rootPath, router);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
      })
      .catch((err: any) => {
        console.error("Connection error", err);
        process.exit();
      });
    app.listen(PORT, () => console.log(`AdminJS started on http://localhost:${PORT}${adminJs.options.rootPath}`))
  } catch (e: any) {
    console.log(`server error ${e.message}`)
    process.exit(1)
  };
};

function initial() {
  Role.estimatedDocumentCount((err: any, count: number) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
//
  const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };


  app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
  app.use(formData.format());
// change the file objects to fs.ReadStream
  app.use(formData.stream());
// union the body and the files
  app.use(formData.union());

};


start()

module.exports = app;
