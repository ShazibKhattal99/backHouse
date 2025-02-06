import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ message: 'Access token is required' });
    return;
  }

  // Support tokens sent as "Bearer <token>" or just the token itself
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // If you want to use req.user, you may need to extend the Request type.
    // For now, we're using a type assertion.
    (req as any).user = decoded;
    next(); // Call the next middleware/handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired access token' });
  }
};
