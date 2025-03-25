import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UrlModel } from "../models/urlModel";


export async function shortenUrl(req: Request, res: Response) {
    const { longUrl } = req.body;

    if (!longUrl) {
        res.status(400).json({ message: "No url was entered." });
    }

    const alias = await UserService.shortenUrl(longUrl);
    res.status(201).json({ shortUrl: `favsurl.com/url/${alias}` });
}

export async function getLongUrl(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "No shortened url was provided." });
    }

    const exists = await UrlModel.idExists(id);
    if (!exists) {
        res.status(404).json({ message: "That shortened url doesn't exist." });
    }

    const url = await UserService.getLongUrl(id);
    res.status(302).json({ longUrl: url });

}


