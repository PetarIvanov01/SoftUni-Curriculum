export function getUserData() {

    return JSON.parse(localStorage.getItem('userData'));
}

export function clearUserData() {

    localStorage.removeItem('userData');
}

export function setUserData(user) {

    localStorage.setItem('userData', JSON.stringify(user));
}

