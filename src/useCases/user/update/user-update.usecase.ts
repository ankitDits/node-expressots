import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import {
    IUserUpdateRequestDTO,
    IUserUpdateResponseDTO,
} from "./user-update.dto";
import { IUSER } from "@entities/user.model";

@provide(UserUpdateUseCase)
class UserUpdateUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(payload: IUserUpdateRequestDTO): Promise<IUserUpdateResponseDTO | null> {
        const userExists: IUSER | null = await this.userRepository.findByEmail(
            payload.email,
        );

        if (!userExists) {
            Report.Error(
                "User not found",
                StatusCode.NotFound,
                "user-update-usecase",
            );

            return null;
        }

        userExists.name = payload.name || userExists.name;

        return {
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            message: "user updated successfully",
        };
    }
}

export { UserUpdateUseCase };
