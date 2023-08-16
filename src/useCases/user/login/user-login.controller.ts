import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpPost, requestBody, response } from "inversify-express-utils";
import { Response } from "express";
import { ILoginUserRequestDTO, ILoginUserResponseDTO } from "./user-login.dto";
import { LoginUserUseCase } from "./user-login.usercase";

@controller("/user/login")
class UserLoginController extends BaseController {
    constructor(private LoginUserUseCase: LoginUserUseCase) {
        super("Login-user-controller")
    }

    @httpPost("/")
    async execute(
        @requestBody() payload: ILoginUserRequestDTO,
        @response() res: Response
    ): Promise<ILoginUserResponseDTO> {

        return await this.callUseCase(
            await this.LoginUserUseCase.execute(payload),
            res,
            StatusCode.OK,
        );
    }
}

export { UserLoginController }