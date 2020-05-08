import { Request, Response } from "express";
import { validateBeforeRegister } from "../../validators/UserValidator";
import { throwSuccess } from "../../utils/throwSuccess";
import { generateSalt } from "../../utils/generateSalt";
import { User, IUser } from "../../model/User";
import { v4 } from "uuid";
import { throwError } from "../../utils/throwError";
import { GeneralError } from "../../errors/GeneralError";
import { sendEmail } from "../../services/EmailService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = await validateBeforeRegister(req, res);
    const hashedPassword = await generateSalt(password);
    const newUserModel = <IUser>{
      email,
      password: hashedPassword,
      uuid: v4(),
    };
    new User(newUserModel)
      .save()
      .then(() => {
        throwSuccess("Successfully registered user.", res);
        sendEmail(
          "Thank you for registering to PortokaLive.",
          email,
          "Please click here to activate your account."
        );
      })
      .catch((err: Error) => {
        throwError(new GeneralError(500, err.message, err.name), res);
      });
  } catch (ex) {
    throw ex;
  }
};
