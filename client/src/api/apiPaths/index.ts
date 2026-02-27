export class VersionPaths {
  static getVersionPath(path: string, version: string) {
    return `${process.env.REACT_BASE_URL}/api/${version}/${path}`;
  }
}

export class AuthenApiPath {
  static login = VersionPaths.getVersionPath("login", "v1");
  static signUp = VersionPaths.getVersionPath("signUp", "v1");
}
