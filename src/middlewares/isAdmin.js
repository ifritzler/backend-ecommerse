import HttpError from "../utils/HttpError.js";
const isAdmin = (req, res, next) => {
  const admin = true;
  if (!admin) throw new HttpError("Unauthorize", 401);
  next();
};

export default isAdmin;
