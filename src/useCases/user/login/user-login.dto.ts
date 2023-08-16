interface ILoginUserRequestDTO {
    email: string;
    password: string;
}

interface ILoginUserResponseDTO {
    token: string | undefined;
    message: string | undefined;
}

export { ILoginUserRequestDTO, ILoginUserResponseDTO };
