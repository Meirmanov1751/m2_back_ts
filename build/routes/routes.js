var express = require("express");
var router = express.Router();
var jsonParser = express.json();
// const controllerBuilding = require("../controllers/building.controller")
// const controllerBuildingImage = require("../controllers/building.image.controller")
// const controllerApartment = require("../controllers/apartment.controller")
// const controllerApartmentImage  = require("../controllers/apartment.image.controller")
var controllerCity = require("../controllers/city.conteroller");
//city
router.get("/city", controllerCity.getCity);
router.post("/city", jsonParser, controllerCity.postCity);
router.get("/city/:id", controllerCity.getByIdCity);
router.put("/city/:id", jsonParser, controllerCity.putCity);
router.delete("/city/:id", controllerCity.deleteCity);
// //apartment
// router.get("/apartment", controllerApartment.getApartment);
//
// router.post("/apartment", jsonParser, controllerApartment.postApartment);
//
// router.get("/apartment/:id", controllerApartment.getByIdApartment);
//
// router.put("/apartment/:id", jsonParser, controllerApartment.putApartment );
//
// router.delete("/apartment/:id", controllerApartment.deleteApartment );
//
// //apartment image
// router.get("/apartmentImage", controllerApartmentImage.getApartmentImage );
//
// router.post("/apartmentImage", jsonParser, controllerApartmentImage.postApartmentImage );
//
// router.get("/apartmentImage/:id", controllerApartmentImage.getByIdApartmentImage );
//
// router.put("/apartmentImage/:id", jsonParser, controllerApartmentImage.putApartmentImage );
//
// router.delete("/apartmentImage/:id", controllerApartmentImage.deleteApartmentImage );
//
// //building
// router.get("/building", controllerBuilding.getBuilding);
//
// router.post("/building", jsonParser, controllerBuilding.postBuilding);
//
// router.get("/building/:id", controllerBuilding.getByIdBuilding);
//
// router.put("/building/:id", jsonParser, controllerBuilding.putBuilding );
//
// router.delete("/building/:id", controllerBuilding.deleteBuilding );
//
// //building image
// router.get("/buildingImage", controllerBuildingImage.getBuildingImage);
//
// router.post("/buildingImage", jsonParser, controllerBuildingImage.postBuildingImage);
//
// router.get("/buildingImage/:id", controllerBuildingImage.getByIdBuildingImage);
//
// router.put("/buildingImage/:id", jsonParser, controllerBuildingImage.putBuildingImage );
//
// router.delete("/buildingImage/:id", controllerBuildingImage.deleteBuildingImage );
//
// module.exports = router;
