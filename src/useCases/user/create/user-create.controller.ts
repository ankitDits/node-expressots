import { BaseController, StatusCode } from "@expressots/core";
import {
    controller,
    httpPost,
    requestBody,
    response,
} from "inversify-express-utils";
import { Response } from "express";
import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from "./user-create.dto";
import { CreateUserUseCase } from "./user-create.usecase";

@controller("/user/create")
class UserCreateController extends BaseController {
    constructor(private createUserUseCase: CreateUserUseCase) {
        super("create-user-controller");
    }

    @httpPost("/")
    async execute(
        @requestBody() payload: ICreateUserRequestDTO,
        @response() res: Response,
    ): Promise<ICreateUserResponseDTO> {
        return await this.callUseCase(
            await this.createUserUseCase.execute(payload),
            res,
            StatusCode.Created,
        );
    }
}

export { UserCreateController };
