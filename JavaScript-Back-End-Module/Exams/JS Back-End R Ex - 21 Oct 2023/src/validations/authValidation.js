const validateLogin = (input) => {

    try {
        const userData = {
            email: input.email,
            password: input.password
        }
        if (userData.email === '' || userData.password === '') {
            throw new Error('All fields are required!')
        }

        return userData
    } catch (error) {
        throw error
    }
}

const validateRegister = (input) => {
    try {
        const userData = {
            email: input.email,
            username: input.username,
            password: input.password,
            rePassword: input.rePassword
        }
        if (Object.values(userData).some(e => e === '')) {
            throw new Error('All fields are required!');
        }
        if (userData.password !== userData.rePassword) {
            throw new Error('Passwords must be the same!');
        }

        return userData
    } catch (error) {
        throw error
    }
}

module.exports = { validateLogin, validateRegister }