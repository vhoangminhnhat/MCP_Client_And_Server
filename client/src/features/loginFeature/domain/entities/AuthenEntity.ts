import { ClientHelpers } from "@/utils/helpers";
import { strings } from "@/utils/localizedStrings";
import { AuthenRequestModel } from "../../data/dto/AuthenRequestModel";

export class AuthenEntity implements AuthenRequestModel {
  email?: string | undefined;
  password?: string | undefined;

  static checkEmail(email: string) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email?.toLowerCase());
  }

  static validatePassword(password: string) {
    if (password?.length <= 6) {
      ClientHelpers.getMessage(
        strings.GlobalMessage.PasswordLength,
        3,
        "error",
      );
      return false;
    } else if (password.toUpperCase() && password !== password.toLowerCase()) {
      ClientHelpers.getMessage(
        strings.GlobalMessage.PasswordNotMatch,
        3,
        "error",
      );
      return false;
    } else {
      return true;
    }
  }
}
