import { compare, hash } from "bcrypt";
import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/UserPayload";
import { User } from "../types/User";

export const AuthService = {

    async signUp(username: string, password: string): Promise<User | null> {

        const exists = await UserModel.userExists(username);
        if (exists) {
            return null;
        } else {
            const hashedPassword = await hash(password, 10);
            const user = await UserModel.createUser(username, hashedPassword);
            return user;
        }
    },

    async logIn(username: string, password: string) {
        const exists = await UserModel.userExists(username);

        if (!exists) {
            return null;
        }

        const user = await UserModel.getUser(username);
        console.log()
        const match = await compare(password, user.password);

        if (!match) {
            return null;
        }

        const payload: UserPayload = {
            id: user.id,
            username: user.username,
            isadmin: user.isadmin
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1hr" })
        return {
            token: token,
            user: user
        };
    }
};