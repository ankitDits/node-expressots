import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from "./user-create.dto";
import { IUSER } from "@entities/user.model";

@provide(CreateUserUseCase)
class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(payload: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO | null> {
        try {
            const userExists: IUSER | null = await this.userRepository.findByEmail(
                payload.email,
            );

            if (userExists) {
                Report.Error(
                    "User already exists",
                    StatusCode.BadRequest,
                    "create-user-usecase",
                );
            }

            let data: IUSER | null = await this.userRepository.create(payload);

            return {
                _id: data?._id,
                email: data?.email,
                name: data?.name,
                message: "user created successfully",
            };
        } catch (error: any) {
            throw error;
        }
    }
}

export { CreateUserUseCase };
