import { BaseRepository } from "@repositories/base-repository";
import { provide } from "inversify-binding-decorators";
import { IUSER } from '../../entities/user.model'
import UserModel from '../../entities/user.model'
import { ICreateUserRequestDTO } from "@useCases/user/create/user-create.dto";
import { ISignupUserRequestDTO } from "@useCases/user/signup/user-signup.dto";
import * as JWT from 'jsonwebtoken';
import ENV from "env";
import { ILoginUserRequestDTO } from "@useCases/user/login/user-login.dto";
@provide(UserRepository)
class UserRepository {
    constructor() {
    }

    async findByEmail(email: string): Promise<IUSER | null> {
        const user = await UserModel.findOne({ email })
        return user;
    }

    async create(item: ICreateUserRequestDTO): Promise<IUSER | null> {
        const existingItem = await this.findByEmail(
            item.email,
        );
        if (existingItem) {
            throw new Error(`Object with id ${existingItem._id} already exists`);
        }
        let newUser: IUSER | null = (await UserModel.create(item)).toObject();
        return newUser
    }

    async find(id: string): Promise<IUSER | null> {
        const user = await UserModel.findById(id)
        if (user) {
            return user;
        } else {
            throw new Error(`user with id ${id} not exists`)
        }
    }

    async delete(id: string): Promise<IUSER | null> {
        const user = await UserModel.findByIdAndDelete(id)
        if (user) {
            return user;
        } else {
            throw new Error(`user with id ${id} not exists`)
        }
    }

    async findAll(): Promise<IUSER[]> {
        const users = await UserModel.find()
        if (users) {
            return users;
        } else {
            throw new Error(`No users found`)
        }
    }

    async Signup(item: ISignupUserRequestDTO): Promise<IUSER | null> {
        const existingItem = await this.findByEmail(
            item.email,
        );
        if (existingItem) {
            throw new Error(`Object with id ${existingItem._id} already exists`);
        }
        let newUser: IUSER | null = (await UserModel.create(item)).toObject();
        return newUser
    }

    async Login(item: ILoginUserRequestDTO): Promise<IUSER | null> {
        const existingItem = await this.findByEmail(
            item.email,
        );
        if (!existingItem) {
            throw new Error(`User not found`);
        }
        if (item.password != existingItem.password) {
            throw new Error(`Invalid credentials`);
        }
        return existingItem;
    }

    async jwtSign(email: string): Promise<string> {
        return await JWT.sign(email, ENV.Credentials.JsonSecretKey)
    }
}

export { UserRepository };
