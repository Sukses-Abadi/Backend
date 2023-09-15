const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken; // Store user information in request object for later use
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
