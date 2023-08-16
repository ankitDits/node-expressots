interface IUserFindRequestDTO {
    email: string;
}

interface IUserFindResponseDTO {
    _id: string;
    name: string;
    email: string;
    message: string;
}

export { IUserFindRequestDTO, IUserFindResponseDTO };
