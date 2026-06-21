class TokenService {
  public setAccessToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  }

  public deleteAccessToken() {
    localStorage.removeItem("accessToken");
  }

  public getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  public setRefreshToken(refreshToken: string) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  public deleteRefreshToken() {
    localStorage.removeItem("refreshToken");
  }

  public getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
}

export const {
  deleteAccessToken,
  getAccessToken,
  setAccessToken,
  deleteRefreshToken,
  getRefreshToken,
  setRefreshToken,
} = new TokenService();
