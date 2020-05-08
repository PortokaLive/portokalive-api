import { Request, Response } from "express";
import { GeneralError } from "../../errors/GeneralError";
import { User, IUser } from "../../model/User";
import { throwError } from "../../utils/throwError";

export const getUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  User.findOne({ email })
    .then((result) => {
      if (!result) {
        throwError(new GeneralError(404, "User not found", "NO_RECORD"), res);
      } else {
        const thisUser = <IUser>{
          id: result.id,
          name: result.get("name"),
          email: result.get("email"),
          age: result.get("age"),
          role: result.get("role"),
          gender: result.get("gender"),
          phone: result.get("phone"),
          uuid: result.get("uuid"),
        };
        res.json({ user: thisUser });
      }
    })
    .catch((err) => {
      throwError(new GeneralError(404, err.message, "NO_RECORD"), res);
    });
};
