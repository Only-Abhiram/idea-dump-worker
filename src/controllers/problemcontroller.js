const Problem = require("../models/problem");

exports.createProblem = async (req, res) => {
  try {
    console.log("New submission from:", req.ip); 
    const { title, description  } = req.body;

    if (!title || !description ) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const existing = await Problem.findOne({
      title: title.trim(),
      description: description.trim()
    });
    
    if (existing) {
      return res.json({
        msg: "Problem submitted already",
        data: problem
      });
    }

    const problem = await Problem.create({
      title,
      description
    });

    res.json({
      msg: "Problem submitted",
      data: problem
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getApprovedProblems = async (req, res) => {
  try {
    console.log("tried pulling");
    const problems = await Problem.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(50);
      console.log("pull success");
    res.json(problems);
  } catch (err) {
    console.log("pull failed");
    res.status(500).json({ error: err.message });
  }
};
exports.upvoteProblem = async (req, res) => {
    try {
      // console.log("came to upvote");
      const { id } = req.params;
  
      // get user identity (IP)
      const userIP = req.ip;
  
      const problem = await Problem.findById(id);
  
      if (!problem) {
        return res.status(404).json({ msg: "Problem not found" });
      }
  
      // check if already voted
      if (problem.votedIPs.includes(userIP)) {
        return res.status(400).json({ msg: "You already voted" });
      }
  
      // increment vote + store IP
      problem.upvotes += 1;
      problem.votedIPs.push(userIP);
  
      await problem.save();
  
      res.json({
        msg: "Upvoted successfully",
        upvotes: problem.upvotes
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };