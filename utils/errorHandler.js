const errorHandler = (err, res) => {
  res.json({
    status: false,
    message: err.message || "Internal Server Error",
    error: err,
  });
};

module.exports = { errorHandler };
