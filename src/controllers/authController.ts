import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";
import jwt from "jsonwebtoken"



export async function signUp(req: Request, res: Response) {
    const { username } = req.body;
    const { password } = req.body;

    if (!username) { // Check if username is empty
        res.status(400).json({ message: "Please enter a username" });
    } else if (!password) { // Check if password is empty
        res.status(400).json({ message: "Please enter a password" });
    } else {
        // Check if password meets requirements
        const hasNumber = /\d/;
        const hasLetter = /[a-zA-Z]/;
        const hasSpecialChar = /[^a-zA-Z0-9]/
        if (!(password.length > 7 && hasNumber.test(password) && hasLetter.test(password) && hasSpecialChar.test(password))) {
            res.status(422).json({ message: "Password length must be greater than or equal to 8 and include a letter, a number, and a special character." })
        } else {

            const theUser = await AuthService.signUp(username, password);

            if (!theUser) { // Check if user already exists
                res.status(409).json({ message: "Username already exists" });
            } else {
                res.status(201).json({
                    message: "Sign up was successful",
                    user: theUser
                });
            }
        }
    }
}

export async function logIn(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await AuthService.logIn(username, password);

    if (!user) {
        res.status(404).json({ message: "Failed log in" })
    } else {
        res.status(200).json({
            message: "Successful login",
            user: user?.user,
            token: user?.token
        })
    }
}

//middleware
export function authenticator(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
    } else if (!process.env.JWT_SECRET) {
        res.status(401).json({ message: 'No secret key, authorization denied' });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);

            // Attaching decoded payload to req.body.user 
            req.body.user = decoded;

            next(); // Pass control to next middleware/route
        } catch (err) {
            console.error(err);
            res.status(401).json({ message: 'Token is not valid' });
        }
    }
}