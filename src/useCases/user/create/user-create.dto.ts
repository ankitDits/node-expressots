interface ICreateUserRequestDTO {
    name: string;
    email: string;
}

interface ICreateUserResponseDTO {
    _id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    message: string | undefined;
}

export { ICreateUserRequestDTO, ICreateUserResponseDTO };
