const { verifyToken } = require("../../lib/jwt");
const prisma = require("../../lib/prisma");
const CustomAPIError = require("./custom-error");

const verifyTokenUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = verifyToken(token);
    const { id, username } = decodedToken;
    const CheckUser = prisma.user.findUnique({ where: { id: id } });
    if (!CheckUser) {
      throw new CustomAPIError("Unauthorized", 401);
    }
    req.user = decodedToken; // Store user information in request object for later use
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const verifyTokenAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const accessToken = token.split(" ")[1];

  try {
    const decodedToken = verifyToken(accessToken);
    const { id, username } = decodedToken;
    const CheckUser = prisma.admin.findUnique({ where: { id: id } });
    if (!CheckUser) {
      throw new CustomAPIError("Unauthorized", 401);
    }
    req.user = decodedToken; // Store user information in request object for later use
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
module.exports = { verifyTokenUser, verifyTokenAdmin };
