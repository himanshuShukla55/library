const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const message = err.message || "Server error";
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
