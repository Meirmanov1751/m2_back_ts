import express, {Router} from 'express';
const router: Router = express.Router();

const controller = require("../controllers/apartment.controller")

//apartment
router.get("/apartment", controller.getApartment);

router.post("/apartment", controller.postApartment);

router.get("/apartment/:id", controller.getByIdApartment);

router.put("/apartment/:id", controller.putApartment );

router.delete("/apartment/:id", controller.deleteApartment );

module.exports = router;
