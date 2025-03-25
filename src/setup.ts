import { hash } from "bcrypt";
import { LogModel } from "./models/logModel";
import { UserModel } from "./models/userModel";
import { UserService } from "./services/userService";
import { LogInput } from "./types/Log";

//creates admin account
async function createAdmin() {
    const hashedPassword = await hash("aaAA22@@", 10);
    const user = await UserModel.createUser("scriptionadmin", hashedPassword);
    const admin = await UserModel.turnIntoAdmin("scriptionadmin");

}
createAdmin().then(result => result);

//creates short url and populates log table
async function populateLogTable() {
    const alias = await UserService.shortenUrl("https://www.youtube.com/watch?v=oXW-C2bM0wE");

    const log1: LogInput = {
        url_id: alias,
        device: 'desktop',
        os: 'Windows',
        country: 'United States',
        city: 'New York'
    }

    const log2: LogInput = {
        url_id: alias,
        device: 'mobile',
        os: 'iOS',
        country: 'Canada',
        city: 'Calgary'
    }

    const log3: LogInput = {
        url_id: alias,
        device: 'tablet',
        os: 'Android',
        country: 'United States',
        city: 'Minnesota'
    }

    const log4: LogInput = {
        url_id: alias,
        device: 'wearable',
        os: 'Android',
        country: 'Germany',
        city: 'Berlin'
    }

    async function testingCreateLogs() {
        const logg1 = await LogModel.createLog(log1);
        const logg2 = await LogModel.createLog(log2);
        const logg3 = await LogModel.createLog(log3);
        const logg4 = await LogModel.createLog(log4);

        const logg5 = await LogModel.createLog(log1);
        const logg6 = await LogModel.createLog(log2);
        const logg7 = await LogModel.createLog(log3);

        const logg8 = await LogModel.createLog(log1);
        const logg9 = await LogModel.createLog(log2);
    };

    testingCreateLogs().then(result => result);
    console.log("Short Url For Admin Analytics Testing:  ", alias);
}

populateLogTable().then(alias => alias)
