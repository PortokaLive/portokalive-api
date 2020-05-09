import { Request, Response } from "express";
import { GeneralError } from "../errors/GeneralError";
import { isEmail } from "./HelperValidator";
import { User, IUser } from "../model/User";
import { throwError } from "../utils/throwError";

interface IAuth {
  email: string;
  password: string;
}

interface IAuthActivation {
  email: string;
  activationCode: string;
}

export const validateBeforeRegister = (
  req: Request,
  res: Response
): Promise<IAuth> => {
  return new Promise((resolve, reject) => {
    const { email, password } = req.body;

    if (!email || !password) {
      reject(new GeneralError(400, "Request body is invalid", "BAD_REQUEST"));
    } else if (!isEmail(email)) {
      reject(
        new GeneralError(400, "Email is not a valid email", "INVALID_EMAIL")
      );
    } else if (password.length < 8) {
      reject(
        new GeneralError(
          400,
          "Password needs minimum 8 characters",
          "INVALID_PASSWORD"
        )
      );
    } else {
      ifUserExists(email)
        .then(() => {
          reject(new GeneralError(422, "User already exists", "INVALID_EMAIL"));
        })
        .catch(() => {
          resolve({
            email,
            password,
          });
        });
    }
  });
};

export const validateBeforeActivate = (
  req: Request,
  res: Response
): Promise<IAuthActivation> => {
  return new Promise((resolve, reject) => {
    try {
      const { email, activationCode } = req.query;
      if (!email || !activationCode) {
        throw new GeneralError(400, "Request query is invalid", "BAD_REQUEST");
      }
      resolve(<IAuthActivation>{
        email,
        activationCode,
      });
    } catch (ex) {
      throwError(ex, res);
      reject();
    }
  });
};

export const validateBeforeLogin = (
  req: Request,
  res: Response
): Promise<IAuth> => {
  return new Promise((resolve, reject) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new GeneralError(400, "Request body is invalid", "BAD_REQUEST");
      } else {
        ifUserExists(email)
          .then(() => {
            resolve({
              email,
              password,
            });
          })
          .catch(() => {
            throw new GeneralError(422, "User does not exists", "NO_RECORD");
          });
      }
    } catch (ex) {
      throwError(ex, res);
      reject();
    }
  });
};

const ifUserExists = (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }).then((user) => {
      if (user) resolve(true);
      else reject(false);
    });
  });
};
