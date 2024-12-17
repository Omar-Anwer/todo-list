import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { BadRequestError } from '../error';

const validateMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new BadRequestError(`${error.details[0].message}`));
    }
    next();
  };
};

export { validateMiddleware };
