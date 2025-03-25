import { nanoid } from "nanoid";
import { UrlModel } from "../models/urlModel";

export const UserService = {
    async shortenUrl(longURL: string) {
        let id = nanoid(11);
        let exists = await UrlModel.idExists(id);
        while (exists) {
            id = nanoid(11);
            exists = await UrlModel.idExists(id);
        }

        const alias = await UrlModel.createUrl(id, longURL);
        return alias;

    },

    async getLongUrl(id: string) {
        const longUrl = await UrlModel.getLongUrl(id);
        return longUrl;
    }
}