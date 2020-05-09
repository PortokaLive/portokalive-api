import { Request, Response, NextFunction } from "express";
import { User } from "../model/User";
import { GeneralError } from "../errors/GeneralError";
import { throwError } from "../utils/throwError";
import { verifyJwt, signJwt } from "../services/AuthService";

export interface IAuthRequest extends Request {
  user: any;
  token: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { email } = await verifyJwt(token).catch((err) => {
        throw new GeneralError(
          404,
          err.message,
          (<string>err.name).toUpperCase()
        );
      });

      const user = await User.findOne({ email }).select("+activated");
      if (!user) {
        throw new GeneralError(
          404,
          "Not authorized to access this resource",
          "INVALID_AUTHORIZATION"
        );
      }
      if (!user.get("activated")) {
        const activationCode = await signJwt({ email, activation: true }, 600);
        throw new GeneralError(
          403,
          `email=${email}&activationCode=${activationCode}`,
          "ACTIVATION_REQUIRED"
        );
      }
      (<IAuthRequest>req).user = user;
      (<IAuthRequest>req).token = token;
      next();
    } else {
      throw new GeneralError(
        404,
        "There is no bearer token in authorization header",
        "INVALID_AUTHENTICATION"
      );
    }
  } catch (ex) {
    throwError(ex, res);
  }
};

export default auth;
