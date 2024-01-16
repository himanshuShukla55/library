import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const { cookies } = req;
  if (!cookies || !cookies.token)
    return res.status(403).json({ success: false, messsage: "Forbidden!" });

  jwt.verify(cookies.token, process.env.USER_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, msg: "Forbidden!" });
    req.userAuth = { userId: decoded.userId, userRole: decoded.userRole };
    next();
  });
};

export default authenticate;
