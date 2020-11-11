const router = require("express").Router();
const StateController = require("./state.controller");

router.get("/", StateController.getStates);

router.get("/:id", StateController.getStateById);

router.post("/", StateController.insertState);

router.put("/:id", StateController.updateState);

router.delete("/:id", StateController.deleteState);

module.exports = router;
