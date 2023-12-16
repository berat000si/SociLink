import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Hata:', err.message);
  res.status(500).json({ error: 'bi hata var' });
};

export default errorHandler;
