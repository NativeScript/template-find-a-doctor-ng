import { Entity } from "kinvey-nativescript-sdk";

export class Estimate implements Entity {
    public _id: string;
    public label: string;
    public priceLow: number;
    public priceHigh: number;
    public priceAvg: number;
    public breakdown: string;

    constructor(dataItem: any) {
        dataItem = dataItem || {};
        this._id = dataItem._id;
        this.label = dataItem.label;
        this.priceLow = dataItem.price_low;
        this.priceHigh = dataItem.price_high;
        this.priceAvg = dataItem.price_avg;
        this.breakdown = dataItem.breakdown;
    }
}
