import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized! (Token Missing)"
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload;

      // attach user to request
      req.user = decoded;

      // role check
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed!"
        });
      }

      next();
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: err.message
      });
    }
  };
};

export default auth;
