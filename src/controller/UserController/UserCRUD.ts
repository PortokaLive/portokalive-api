import { Request, Response } from "express";
import { GeneralError } from "../../errors/GeneralError";
import { User, IUser } from "../../model/User";
import { throwError } from "../../utils/throwError";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      throw new GeneralError(404, "User not found", "NO_RECORD");
    } else {
      const thisUser = <IUser>{
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        role: user.role,
        gender: user.gender,
        phone: user.phone,
        uuid: user.uuid
      };
      res.json({ user: thisUser });
    }
  } catch (ex) {
    throwError(ex, res);
  }
};
