import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import { IUserFindRequestDTO, IUserFindResponseDTO } from "./user-find.dto";
import { IUSER } from "@entities/user.model";

@provide(UserFindUseCase)
class UserFindUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(payload: IUserFindRequestDTO): Promise<IUserFindResponseDTO | null> {
        const userExists: IUSER | null = await this.userRepository.findByEmail(payload.email);

        if (!userExists) {
            Report.Error(
                "User not found",
                StatusCode.NotFound,
                "user-find-usecase",
            );
            return null;
        }
        return {
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            message: "user found successfully",
        };
    }
}

export { UserFindUseCase };
