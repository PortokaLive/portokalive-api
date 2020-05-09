import { Request, Response } from "express";
import { validateBeforeLogin } from "../../validators/UserValidator";
import { User } from "../../model/User";
import bcrypt from "bcryptjs";
import { throwError } from "../../utils/throwError";
import { GeneralError } from "../../errors/GeneralError";
import { signJwt } from "../../services/AuthService";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = await validateBeforeLogin(req, res);
  const userPayload = await findAndComparePassword(email, password);
  if (!userPayload) {
    throwError(
      new GeneralError(401, "Invalid credentials", "LOGIN_FAILED"),
      res
    );
  }
  const token = await signJwt(userPayload, 31556926);
  res.json({
    result: "SUCCESS",
    token: "Bearer " + token,
  });
};

const findAndComparePassword = (
  email: string,
  password: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .select("+password")
      .then((user) => {
        if (user) {
          bcrypt
            .compare(password, user.get("password"))
            .then((result) => {
              if (result) {
                resolve({
                  id: user.id,
                  email: user.get("email"),
                  uuid: user.get("uuid"),
                });
              }
              reject();
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {});
  });
};
