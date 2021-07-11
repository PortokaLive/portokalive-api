import { Request, Response } from "express";
import { validateBeforeLogin } from "../../validators/UserValidator";
import { User } from "../../model/User";
import bcrypt from "bcryptjs";
import { throwError } from "../../utils/throwError";
import { GeneralError } from "../../errors/GeneralError";
import { signJwt } from "../../services/AuthService";
import logger from "../../logger";

export const loginUser = async (req: Request, res: Response) => {
  try {
    logger.log("Logging the user...");
    const { email, password } = await validateBeforeLogin(req, res);
    const userPayload = await findAndComparePassword(email, password);
    if (!userPayload) {
      throw new GeneralError(401, "Invalid credentials", "LOGIN_FAILED");
    }
    if (!userPayload.activated) {
      const activationPayload = { email, activation: true };
      const activationCode = await signJwt(activationPayload, 600);
      throw new GeneralError(
        403,
        `email=${userPayload.email}&activationCode=${activationCode}`,
        "ACTIVATION_REQUIRED"
      );
    }
    const token = await signJwt(
      { ...userPayload, api_key: process.env.API_VIDEO_API_KEY },
      31556926
    );
    res.json({
      result: "SUCCESS",
      token: "Bearer " + token,
    });
  } catch (ex) {
    throwError(ex, res);
  }
};

const findAndComparePassword = (
  email: string,
  password: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .select("+password")
      .select("+activated")
      .then((user) => {
        if (user) {
          bcrypt
            .compare(password, user.get("password"))
            .then((result) => {
              if (result) {
                const thisUser = <any>{};
                thisUser.id = user.id;
                thisUser.email = user.email;
                thisUser.uuid = user.uuid;
                thisUser.activated = user.activated;
                thisUser.liveStreamId = user.liveStreamId;
                resolve(thisUser);
              }
              reject(
                reject(
                  new GeneralError(401, "Invalid credentials", "INVALID_LOGIN")
                )
              );
            })
            .catch((err) => {
              reject(new GeneralError(401, err.message, "INVALID_LOGIN"));
            });
        }
      })
      .catch((err) => {
        reject(new GeneralError(401, err.message, "INVALID_LOGIN"));
      });
  });
};
