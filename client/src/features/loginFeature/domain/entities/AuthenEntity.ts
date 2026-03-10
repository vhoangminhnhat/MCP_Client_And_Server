export class AuthenEntity {
  email?: string | undefined;
  password?: string | undefined;

  static checkEmail(email: string) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email?.toLowerCase());
  }

  static validatePassword(password: string) {
    if (
      password?.length <= 6 ||
      (password.toUpperCase() && password !== password.toLowerCase())
    ) {
      return false;
    } else {
      return true;
    }
  }
}
