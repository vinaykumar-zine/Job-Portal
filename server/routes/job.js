const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
} = require("../controllers/job");
const { verifyAuth } = require("../middlewares/verifyAuth");
router.get("/", (req, res) => {
  res.status(200).send("Job Route!");
});
router.post("/create", verifyAuth, createJob);
router.get("/all", getAllJobs);
router.get("/view/:jobnumber", getJobById); 
router.patch("/update/:jobnumber", verifyAuth, updateJob);
module.exports = router;