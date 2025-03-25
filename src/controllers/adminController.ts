import { Request, Response } from "express"
import { AdminService } from "../services/adminService";
import { UrlModel } from "../models/urlModel";


export async function reqAnalytics(req: Request, res: Response) {
    const { id } = req.params;
    const shortUrl = id;

    if (!shortUrl) {
        res.status(400).json({ message: "No shortened url was submitted." });
    } else {

        const exists = await UrlModel.idExists(shortUrl);
        if (!exists) {
            res.status(404).json({ message: "Inputed shortened url doesn't exist." });
        } else {

            const total = await AdminService.totRequests(shortUrl);
            const weekly = await AdminService.weeklyRequests(shortUrl);
            const monthly = await AdminService.monthlyRequests(shortUrl);
            const deviceDistr = await AdminService.distr(shortUrl, 'device');
            const osDistr = await AdminService.distr(shortUrl, "os");
            const countryDistr = await AdminService.distr(shortUrl, "country");
            const cityDistr = await AdminService.distr(shortUrl, "city");
            const timeOfDayDistr = await AdminService.timeDistr(shortUrl);
            const mostReqMonth = await AdminService.maxMonth(shortUrl);
            const mostReqWeek = await AdminService.maxWeek(shortUrl);

            res.status(200).json({
                "total_requests": total,
                "date_analytics": {
                    "per_week": weekly,
                    "per_month": monthly,
                    "highest_week": mostReqWeek,
                    "highest_month": mostReqMonth,
                    "time_of_day_distr": timeOfDayDistr
                },
                "device_analytics": {
                    "os_distr": osDistr,
                    "device_distr": deviceDistr
                },
                "location_analytics": {
                    "country_distr": countryDistr,
                    "city_distr": cityDistr
                }
            })
        }
    }
}
