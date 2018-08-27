import { Entity } from "kinvey-nativescript-sdk";

export class Procedure implements Entity {
    public _id: string;
    public name: string;
    public category: string;
    public keywords: string;
    public selected: boolean;

    constructor(dataItem: any) {
        dataItem = dataItem || {};
        this._id = dataItem._id;
        this.name = dataItem.name;
        this.category = dataItem.category;
        this.keywords = dataItem.keywords;
        this.selected = dataItem.selected === true;
    }
}
