import jwtDecode from 'jwt-decode';
import http from './httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/auth`;
const tokenKey = 'token';

http.setJwt(getJwtToken());

export async function login(email, password) {
    const {data: jwt} = await http.post(apiEndpoint, {
        email,
        password
    });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getJwtToken() {
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const user = jwtDecode(getJwtToken());
        return user;
    } catch (ex) {
        return null;
    }
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwtToken: getJwtToken
};