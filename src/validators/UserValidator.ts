import { Request, Response } from "express";
import { GeneralError } from "../errors/GeneralError";
import { isEmail } from "./HelperValidator";
import { User } from "../model/User";
import { throwError } from "../utils/throwError";

interface IRegisterUser {
  email: string;
  password: string;
}

export const validateBeforeRegister = (
  req: Request,
  res: Response
): Promise<IRegisterUser> => {
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

const ifUserExists = (email: string) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }).then((user) => {
      if (user) resolve();
      else reject();
    });
  });
};
