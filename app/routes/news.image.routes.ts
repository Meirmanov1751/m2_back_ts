import express, {Router} from 'express';
const router: Router = express.Router();

const controller = require("../controllers/news.image.controller")

//news image
router.get("/newsImage", controller.getNewsImage);

module.exports = router;
