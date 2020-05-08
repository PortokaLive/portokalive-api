import { Request, Response } from "express";
import { GeneralError } from "../errors/GeneralError";
import { isEmail } from "./HelperValidator";
import { User, IUser } from "../model/User";
import { throwError } from "../utils/throwError";

interface IAuth {
  email: string;
  password: string;
}

export const validateBeforeRegister = (
  req: Request,
  res: Response
): Promise<IAuth> => {
  return new Promise((resolve, reject) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throwError(
        new GeneralError(400, "Request body is invalid", "BAD_REQUEST"),
        res
      );
    } else if (!isEmail(email)) {
      throwError(
        new GeneralError(400, "Email is not a valid email", "INVALID_EMAIL"),
        res
      );
    } else if (password.length < 8) {
      throwError(
        new GeneralError(
          400,
          "Password needs minimum 8 characters",
          "INVALID_PASSWORD"
        ),
        res
      );
    } else {
      ifUserExists(email)
        .then(() => {
          throwError(
            new GeneralError(422, "User already exists", "INVALID_EMAIL"),
            res
          );
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

export const validateBeforeLogin = (
  req: Request,
  res: Response
): Promise<IAuth> => {
  return new Promise((resolve, reject) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throwError(
        new GeneralError(400, "Request body is invalid", "BAD_REQUEST"),
        res
      );
    } else {
      ifUserExists(email)
        .then(() => {
          resolve({
            email,
            password,
          });
        })
        .catch(() => {
          throwError(
            new GeneralError(422, "User does not exists", "NO_RECORD"),
            res
          );
        });
    }
  });
};

const ifUserExists = (email: string) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }).then((user) => {
      if (user) resolve();
      else reject();
    });
  });
};
