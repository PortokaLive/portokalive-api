import { EmailRegex } from "../constants/Regex";

export const isEmail = (checkingString: string): boolean => {
  return EmailRegex.test(checkingString);
};
