import { provide } from "inversify-binding-decorators";

@provide(AppUseCase)
class AppUseCase {
    execute(): object {
        return {
            message: "Hello from ExpressoTS App"
        }
    }
}

export { AppUseCase };
