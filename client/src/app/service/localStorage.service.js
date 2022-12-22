const TOKEN_KEY = "jwt-token";
const EXPIRES_KEY = "jwt-expires";
const REFRESH_KEY = "jwt-refresh-token";
const USER_KEY = "user-local";
const USER_ROLE = "user-role";

export function setTokens({
                              refreshToken,
                              accessToken,
                              userId,
                              role,
                              expiresIn = 3600,
                          }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USER_KEY, userId);
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(USER_ROLE, JSON.stringify(role));
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUser() {
    return localStorage.getItem(USER_KEY);
}

export function getRole() {
    return localStorage.getItem(USER_ROLE);

}

export function removeAuthData() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USER_ROLE);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getExpiresDate,
    getRefreshToken,
    getUser,
    removeAuthData,
};

export default localStorageService;
