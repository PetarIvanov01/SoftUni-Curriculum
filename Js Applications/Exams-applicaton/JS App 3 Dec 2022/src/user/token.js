export function getUserData() {

    const user = sessionStorage.getItem('userData')
    if (user != null) {
        return JSON.parse(user)
    }
    else {
        return null
    }

}
export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data))

}

export function clearUserData() {
    sessionStorage.removeItem('userData')

}