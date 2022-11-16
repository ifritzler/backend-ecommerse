import _ from "lodash";
import HttpError from "../utils/HttpError.js";
const notBodyEmpty = (req, _res, next) => {
  if (_.isEmpty(req.body)) throw new HttpError("Body cannot be empty", 400);
  next();
};

export { notBodyEmpty };
