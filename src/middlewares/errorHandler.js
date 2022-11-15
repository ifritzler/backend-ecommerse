const errorHandler = (error, req, res, next) => {
  try{
    res.status(error.statusCode || 500).json({ error: JSON.parse(error.message) });
  }catch {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export default errorHandler;
