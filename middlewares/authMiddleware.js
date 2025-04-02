const jwt = require("jsonwebtoken"); // Import JWT for authentication

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided" });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
    console.log("The decoded user is ", req.user);
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateJWT;
