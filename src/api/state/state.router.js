const router = require("express").Router();
const StateController = require("./state.controller");

router.get("/", StateController.getStates);

router.get("/:id", StateController.getStateById);

router.post("/", StateController.insertState);

router.put("/", StateController.updateState);

router.delete("/", StateController.deleteState);

module.exports = router;
