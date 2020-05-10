import { Request, Response } from "express";
import {
  validateBeforeRegister,
  validateBeforeActivate,
} from "../../validators/UserValidator";
import { User, IUser } from "../../model/User";
import { v4 } from "uuid";
import { throwError } from "../../utils/throwError";
import { GeneralError } from "../../errors/GeneralError";
import { sendEmailHTML } from "../../services/EmailService";
import {
  generateSalt,
  signJwt,
  verifyJwt,
  generateUUID,
} from "../../services/AuthService";
import { throwSuccess } from "../../utils/throwSuccess";
import { readHTMLFile, fillTemplate } from "../../services/FileService";
import { getClientUrl } from "../../services/EnvironmentService";

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
        doPostRegisterSteps(email);
        throwSuccess("Please check your email for account activation.", res);
      })
      .catch((err: Error) => {
        throw new GeneralError(500, err.message, err.name);
      });
  } catch (ex) {
    throwError(ex, res);
  }
};

export const sendActivationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("+activated");

    if (user?.activated) {
      throwError(
        new GeneralError(403, "Already activated", "INVALID_ACTIVATION"),
        res
      );
    } else {
      doPostRegisterSteps(email)
        .then(() => {
          throwSuccess(`Another email has been sent to ${email}`, res);
        })
        .catch((err) => {
          throw new GeneralError(500, err.message, err.name);
        });
    }
  } catch (ex) {
    throwError(ex, res);
  }
};

const doPostRegisterSteps = async (email: string) => {
  const html = await readHTMLFile("src/emails/RegisterUser_Template.html");
  const payload = {
    email,
    activation: true,
  };

  const activationCode = await signJwt(payload, 600);
  const url = getClientUrl();
  const time = new Date().toLocaleString();
  const registerTemplateReplacement = {
    email,
    activationCode,
    url,
    time,
    uuid: generateUUID(),
  };

  const template = fillTemplate(html, registerTemplateReplacement);
  sendEmailHTML("Please activate your account", email, template);
  return;
};

export const activateUser = async (req: Request, res: Response) => {
  try {
    const { email, activationCode } = await validateBeforeActivate(req, res);
    const { activation } = await verifyJwt(activationCode).catch(() => {
      throw new GeneralError(400, "Invalid activation", "BAD_REQUEST");
    });

    if (!!activation) {
      const user = await User.findOne({ email }).select("+activated");
      if (!user) {
        throw new GeneralError(400, "Invalid activation", "BAD_REQUEST");
      } else {
        user.activated = true;
        user.save();
        const thisUser = <any>{};
        thisUser.id = user.id;
        thisUser.email = user.email;
        thisUser.uuid = user.uuid;
        thisUser.activated = user.activated;
        const token = await signJwt(thisUser, 31556926);
        res.json({
          result: "SUCCESS",
          token: "Bearer " + token,
        });
      }
    }
  } catch (ex) {
    throwError(ex, res);
  }
};
