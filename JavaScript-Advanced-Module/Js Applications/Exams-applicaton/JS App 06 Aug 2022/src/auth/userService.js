import { clearUserData, setUserData } from "./storage.js";
import { get, post } from "./api.js";

const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export async function login(email, password) {
    try {
        const user = await post(endPoints.login, { email, password });
        setDataToLocaleSt(user);

    } catch (error) {
        throw error

    }
}

export async function register(email, password) {
    try {
        const user = await post(endPoints.register, { email, password });
        setDataToLocaleSt(user);

    } catch (error) {
        throw error
    }

}

export async function logout() {
    try {
        await get(endPoints.logout);
        clearUserData();

    } catch (error) {
        throw error
    }

}

function setDataToLocaleSt(user) {

    const userData = {
        email: user.email,
        password: user.password,
        token: user.accessToken,
        id: user._id
    }
    setUserData(userData);

}
