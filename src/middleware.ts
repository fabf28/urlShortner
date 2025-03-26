import { NextFunction, Request, Response } from "express";
import { LogModel } from "./models/logModel";
import { LogInput } from "./types/Log";
import axios from "axios";
import * as UAParser from 'ua-parser-js';

//middleware to log user data
export async function logger(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const ip = "8.8.8.8"; //for testing purposes
    const ext_res = await axios.get(`https://ipapi.co/${ip}/json/`);
    const geo = ext_res.data;

    const source = req.headers['user-agent'] || '';
    const parser = new UAParser.UAParser(source);
    const dev = parser.getResult();


    const details: LogInput = {
        url_id: id,
        device: dev.device.type || 'desktop',
        os: dev.os.name || 'macOS',
        country: geo?.country_name,
        city: geo?.city
    }

    const log = await LogModel.createLog(details);
    next();
}

//middleware to check if user is admin
export async function adminChecker(req: Request, res: Response, next: NextFunction) {
    const { user } = req.body;
    const isadmin = user.isadmin;

    if (!isadmin) {
        res.status(401).json({ message: "Can't access analytics tools wihtout admin access." })
    } else {
        next();
    }
}

//authiticator middleware is in authController.ts



