const { verifyToken } = require("../../lib/jwt");

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  try {
    const decodedToken = verifyToken(token);
    console.log(`after`);
    req.user = decodedToken; // Store user information in request object for later use
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyTokenMiddleware;
