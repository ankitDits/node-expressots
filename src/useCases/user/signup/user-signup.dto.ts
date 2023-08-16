interface ISignupUserRequestDTO {
    email: string;
    password: string;
    confirmPassword: string;
}

interface ISignupUserResponseDTO {
    token: string | undefined;
    message: string | undefined;
}

export { ISignupUserRequestDTO, ISignupUserResponseDTO };
