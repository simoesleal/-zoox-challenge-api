const router = require("express").Router();
const CityController = require("./city.controller");

router.get("/", CityController.getCities);

router.get("/:id", CityController.getCityById);

router.post("/", CityController.insertCity);

router.put("/:id", CityController.updateCity);

router.delete("/:id", CityController.deleteCity);

module.exports = router;
