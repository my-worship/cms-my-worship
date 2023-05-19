export default class AuthServices {
  public AllowOsTypeChecking(): boolean {
    const platform = navigator.platform;
    const listPlatform: string[] = [
      "Win32",
      "Win16",
      "SunOS",
      "MacIntel",
      "MacPPC",
      "Mac68K",
      "Linux armv7l",
      "Linux i686",
      "HP-UX",
      "Linux x86_64",
    ];
    return listPlatform.includes(platform);
  }

  public successLogin(data: string): void {
    localStorage.setItem("token", data);
    window.location.replace("/");
  }

  public async Logout() {
    localStorage.clear();
    window.location.replace("/");
  }

  public authCheck(): boolean {
    const dataLocalToken = localStorage.getItem("token");
    return !!dataLocalToken;
  }
}
