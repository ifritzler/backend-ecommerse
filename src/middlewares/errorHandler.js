const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).send({ error: error.message });
};

export default errorHandler;
