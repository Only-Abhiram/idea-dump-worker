const cron = require("node-cron");
const Problem = require("../models/problem");
const { validateProblem } = require("../services/aiservice");
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
const runWorker = () => {
  cron.schedule("*/2 * * * *", async () => {
    console.log("Running worker...");

    const problems = await Problem.find({ status: "pending" }).limit(5);

    for (let problem of problems) {
      try {
        const result = await validateProblem(problem);

        if (result.is_valid) {
          problem.status = "approved";
          problem.ai = {
            summary: result.summary,
            clarity: result.clarity,
            uniqueness: result.uniqueness,
            market: result.market,
            category: result.category
          };
        } else {
          problem.status = "rejected";
        }

        await problem.save();

      } catch (err) {
        console.error("Worker error:", err.message);
      }
      await sleep(1000); // 1 sec gap
    }
  });
};

module.exports = runWorker;