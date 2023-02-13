import express, {Router} from 'express';
const router: Router = express.Router();

const controller = require("../controllers/news.controller")

//apartment image
router.get("/news", controller.getNews );

router.post("/news", controller.postNews );

router.get("/news/:id", controller.getByIdNews );

router.put("/news/:id", controller.putNews );

router.delete("/news/:id", controller.deleteNews );

module.exports = router;
