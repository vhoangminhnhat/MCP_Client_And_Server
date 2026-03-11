export class VersionPaths {
  static getVersionPath(path: string, version: string) {
    return `/api/${version}/${path}`;
  }
}

export class AuthenApiPath {
  static login = VersionPaths.getVersionPath("auth/login", "v1");
  static signUp = VersionPaths.getVersionPath("auth/sign-up", "v1");
}

export class ChatApiPath {
  static messages = VersionPaths.getVersionPath("chat/messages", "v1");
}
