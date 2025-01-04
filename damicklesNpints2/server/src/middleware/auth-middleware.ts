import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface TokenPayload { userId: string; }

declare global {
  namespace Express {
    interface Request { userId?: string; }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.userId = decoded.userId;

    next(); // Call next if everything is okay 
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }

  return; // Add a return statement to fix the issue
};

export default authMiddleware;
