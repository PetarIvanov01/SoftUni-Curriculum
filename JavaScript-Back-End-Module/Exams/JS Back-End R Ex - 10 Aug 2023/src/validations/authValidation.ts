export interface RegisterInput {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rePassword: string
}

export interface LoginInput {
    email: string,
    password: string
}


export const validateLogin = (input: any): LoginInput => {

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

export const validateRegister = (input: any): RegisterInput => {
    try {
        const userData: RegisterInput = {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
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