import { CreateModule } from "@expressots/core";
import { UserCreateController } from "./create/user-create.controller";
import { UserDeleteController } from "./delete/user-delete.controller";
import { UserUpdateController } from "./update/user-update.controller";
import { UserFindController } from "./find/user-find.controller";
import { UserFindallController } from "./findall/user-findall.controller";
import { UserSignupController } from "./signup/user-signup.controller";
import { UserLoginController } from "./login/user-login.controller";

const UserModule = CreateModule([
    UserCreateController,
    UserDeleteController,
    UserUpdateController,
    UserFindController,
    UserFindallController,
    UserSignupController,
    UserLoginController
]);

export { UserModule };
