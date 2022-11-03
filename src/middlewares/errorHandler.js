const errorHandler = (error, req, res, next) => {
  res.status(500).send({ error: error.message });
};

export default errorHandler;
