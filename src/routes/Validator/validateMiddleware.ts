import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

export const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }
  next();
};
