const permit = (role) => (req, res, next) => {
  if (req.userAuth.userRole !== role)
    return res.status(403).json({
      success: false,
      message: "Forbidden!",
    });
  next();
};

export default permit;
