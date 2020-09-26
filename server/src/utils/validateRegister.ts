import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput"

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export const validateRegister = (options: UsernamePasswordInput) => {
    if (!options.email.match(emailRegex)) {
        return [{
            field: 'email',
            message: 'email is invalid'
        }]
    }

    if (options.username.length < 2) {
        return [{
            field: 'username',
            message: 'username is too short'
        }]

    }
    if (options.username.match(emailRegex)) {
        return [{
            field: 'username',
            message: 'wrong username'
        }]
    }
    if (options.password.length < 2) {
        return [{
            field: 'password',
            message: 'password is too short'
        }]
    }

    return null
}