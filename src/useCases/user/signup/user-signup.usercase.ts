import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import { IUSER } from "@entities/user.model";
import { ISignupUserRequestDTO, ISignupUserResponseDTO } from "./user-signup.dto";

@provide(SignupUserUseCase)
class SignupUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(payload: ISignupUserRequestDTO): Promise<ISignupUserResponseDTO> {
        try {
            const userExists: IUSER | null = await this.userRepository.findByEmail(
                payload.email,
            );

            if (userExists) {
                Report.Error(
                    "User already exists",
                    StatusCode.BadRequest,
                    "Signup-user-usecase",
                );
            }
            if (payload.password !== payload.confirmPassword) {
                Report.Error(
                    "password doesn't matching with confirmPassword",
                    StatusCode.BadRequest,
                    "Signup-user-usecase",
                );
            }
            let data: IUSER | null = await this.userRepository.Signup(payload);
            let token = await this.userRepository.jwtSign(payload.email)
            if (!data) {
                Report.Error(
                    "User signup failed",
                    StatusCode.InternalServerError,
                    "Signup-user-usecase",
                )
            }
            return {
                token,
                message: "user Signedup successfully",
            };
        } catch (error: any) {
            throw error;
        }
    }
}

export { SignupUserUseCase };
