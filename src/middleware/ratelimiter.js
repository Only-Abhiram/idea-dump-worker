const rateLimit = require("express-rate-limit");

const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { submitLimiter };