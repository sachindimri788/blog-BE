import { JwtPayload } from "../libs/Jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
