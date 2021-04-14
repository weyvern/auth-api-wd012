import { validationResult } from 'express-validator';

const checkForErrors = (req, res, next) => {
  console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default checkForErrors;
