export function getUserData() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
}

export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData() {

    localStorage.removeItem('user');
}