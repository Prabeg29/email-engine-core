import { NextFunction, Request, Response } from 'express';

import logger from '../utils/logger.util';

const buildError = (error: Error) => {
  return {
    message   : error.message,
  };
};

const routeNotFound = (_req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Resource not found' });

  next();
};

const genericErrorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  const err = buildError(error);

  logger.error(`${req.method}:${req.path} >> ${error.stack} || ${error.message}`);

  res.status(400).json({ message: err.message });
};

export { routeNotFound, genericErrorHandler };
