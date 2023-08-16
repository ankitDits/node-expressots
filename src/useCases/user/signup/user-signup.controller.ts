import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpPost, requestBody, response } from "inversify-express-utils";
import { ISignupUserRequestDTO, ISignupUserResponseDTO } from "./user-signup.dto";
import { Response } from "express";
import { SignupUserUseCase } from "./user-signup.usercase";

@controller("/user/signup")
class UserSignupController extends BaseController {
    constructor(private signupUserUseCase: SignupUserUseCase) {
        super("signup-user-controller")
    }

    @httpPost("/")
    async execute(
        @requestBody() payload: ISignupUserRequestDTO,
        @response() res: Response
    ): Promise<ISignupUserResponseDTO> {

        return await this.callUseCase(
            await this.signupUserUseCase.execute(payload),
            res,
            StatusCode.Created,
        );
    }
}

export { UserSignupController }