export const validatePassword = (hashPassword) => {
    return hashPassword.length >= 6;
};