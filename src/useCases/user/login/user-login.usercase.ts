import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import { IUSER } from "@entities/user.model";
import { ILoginUserRequestDTO, ILoginUserResponseDTO } from "./user-login.dto";

@provide(LoginUserUseCase)
class LoginUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(payload: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
        try {
            const userExists: IUSER | null = await this.userRepository.findByEmail(
                payload.email,
            );

            if (!userExists) {
                Report.Error(
                    "User not found",
                    StatusCode.NotFound,
                    "Login-user-usecase",
                );
            }
            let data: IUSER | null = await this.userRepository.Login(payload);
            let token = await this.userRepository.jwtSign(payload.email)
            if (!data) {
                Report.Error(
                    "User Login failed",
                    StatusCode.InternalServerError,
                    "Login-user-usecase",
                )
            }
            return {
                token,
                message: "user Login successfully",
            };
        } catch (error: any) {
            throw error;
        }
    }
}

export { LoginUserUseCase };
