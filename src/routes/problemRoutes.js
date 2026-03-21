const express = require("express");
const router = express.Router();
const { submitLimiter } = require("../middleware/ratelimiter");
const {
  createProblem,
  getApprovedProblems, upvoteProblem
} = require("../controllers/problemcontroller");

router.post("/submit", submitLimiter,createProblem);
router.get("/approved", getApprovedProblems);
router.patch("/upvote/:id", upvoteProblem);

module.exports = router;