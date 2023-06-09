const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("You are not logged in");
  }
  try {
    const decoded = jwt.verify(token, "TOKEN");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid User");
  }
  return next();
};

module.exports = authenticator;