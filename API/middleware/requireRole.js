const jwt = require("jsonwebtoken");

const requireRole = (role) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      console.error("Error verifying token:", err);
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = requireRole;
