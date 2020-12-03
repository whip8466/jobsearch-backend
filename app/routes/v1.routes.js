const UserController = require("../controllers/users.controller.js");
const TagController = require("../controllers/tags.controller.js");
const JobController = require("../controllers/job.controller.js");
const router = require("express").Router();

/**
 *   USERS APIs
 * **/
router.post("/login", UserController.login);

/**
 *   TAGS APIs
 * **/
router.post("/tag", TagController.create);
router.put("/tag/:id", TagController.update);
router.get("/tags", TagController.findAll);
router.delete("/tag/:id", TagController.remove);

/**
 *   JOBS APIs
 * **/
router.post("/job", JobController.create);
router.put("/job/:id", JobController.update);
router.get("/jobs", JobController.findAll);
router.delete("/job/:id", JobController.remove);
router.get("/search-jobs/:searchQuery", JobController.SearchJobs);


module.exports = router;
