export function getUserData() {

    return JSON.parse(sessionStorage.getItem('userData'));
}

export function clearUserData() {

    sessionStorage.removeItem('userData');
}

export function setUserData(userData) {
    
    sessionStorage.setItem('userData',JSON.stringify(userData));

}