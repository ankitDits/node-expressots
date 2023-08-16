import { provide } from "inversify-binding-decorators";
import { UserRepository } from "@repositories/user/user.repository";
import { IFindAllUserResponseDTO } from "./user-findall.dto";
import { IUSER } from "@entities/user.model";

@provide(FindAllUserUseCase)
class FindAllUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(): Promise<IFindAllUserResponseDTO[] | null> {
        try {
            const users: IUSER[] = await this.userRepository.findAll();
            const response: IFindAllUserResponseDTO[] = [];

            users.forEach((user: IUSER) => {
                response.push({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                });
            });

            return response;
        } catch (error: any) {
            throw error;
        }
    }
}

export { FindAllUserUseCase };
