import { LogModel } from "../models/logModel";
import { getWeek } from "date-fns";



export const AdminService = {
    async totRequests(url_id: string): Promise<number> {
        const numOfRequests = await LogModel.totRequests(url_id);
        return numOfRequests;
    },

    async percentOf(url_id: string, column: string, unique: string): Promise<number> {
        const numerator = await LogModel.totRequestsSpecific(url_id, column, unique);
        const denominator = await LogModel.totRequests(url_id);
        const percent = numerator / denominator;
        return percent;
    },

    numberOf(list: Array<string>, specific: string): number {
        const total = list.filter(x => x === specific).length;
        return total;
    },

    percentOf2(list: Array<string>, specific: string): number {
        const denominator = list.length;
        const numerator = list.filter(x => x === specific).length;
        const percent = numerator / denominator;
        return percent;
    },

    //city, country, device, os
    async distr(url_id: string, column: string) {
        const uniques = await LogModel.findUnique(url_id, column);
        let distr = {};
        for (const unique of uniques as Array<string>) {
            const percent = await this.percentOf(url_id, column, unique);
            distr = {
                ...distr,
                [unique]: percent
            }
        }
        return distr;
    },

    async monthlyRequests(url_id: string) {

        //parsing dates for months and finding unique values
        const dates = await LogModel.findColumn(url_id, 'date');
        const parsedDates = dates.map(x => new Date(String(x)));
        const months = parsedDates.map(x => x.getFullYear() + " - Month " + x.getMonth());
        const uniques = [...new Set(months)];

        let distr = {};
        for (const unique of uniques as Array<string>) {
            const total = this.numberOf(months as Array<string>, unique);
            distr = {
                ...distr,
                [unique]: total
            }
        }
        return distr;
    },

    async weeklyRequests(url_id: string) {

        //parsing dates for weeks and finding unique values
        const dates = await LogModel.findColumn(url_id, 'date');
        const parsedDates = dates.map(x => new Date(String(x)));
        const weeks = parsedDates.map(x => x.getFullYear() + " - Week " + getWeek(x));
        const uniques = [...new Set(weeks)];

        let distr = {};
        for (const unique of uniques as Array<string>) {
            const total = this.numberOf(weeks as Array<string>, unique);
            distr = {
                ...distr,
                [unique]: total
            }
        }
        return distr;
    },

    timeOfDay(date: Date) {
        const hours = date.getHours();
        if (hours > 5) {
            return "night"
        } else if (hours > 12) {
            return "morning";
        } else if (hours > 16) {
            return "afternoon";
        } else if (hours > 21) {
            return "evening";
        } else if (hours >= 24) {
            return "night";
        }
    },

    async timeDistr(url_id: string) {
        //parsing dates for months and finding unique values
        const dates = await LogModel.findColumn(url_id, 'date');
        const parsedDates = dates.map(x => new Date(String(x)));
        const days = parsedDates.map(x => this.timeOfDay(x));
        const uniques = [...new Set(days)];

        let distr = {};
        for (const unique of uniques as Array<string>) {
            const percent = this.percentOf2(days as Array<string>, unique);
            distr = {
                ...distr,
                [unique]: percent
            }
        }
        return distr;
    },

    //finds week with most requests
    async maxWeek(url_id: string) {
        const weeks = await this.weeklyRequests(url_id);
        const vals: Array<number> = Object.values(weeks);
        const maxx = Math.max(...vals);
        const index = vals.indexOf(maxx);
        const result = Object.keys(weeks)[index];
        return result;
    },

    //finds month with most requests
    async maxMonth(url_id: string) {
        const months = await this.monthlyRequests(url_id);
        const vals: Array<number> = Object.values(months);
        const maxx = Math.max(...vals);
        const index = vals.indexOf(maxx);
        const result = Object.keys(months)[index];
        return result;
    }
}