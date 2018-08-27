import { Entity } from "kinvey-nativescript-sdk";

export class Specialty implements Entity {
    public _id: string;
    public specialty: string;
    public selected: boolean;

    constructor(options: any) {
        options = options || {};
        this._id = options._id;
        this.specialty = options.specialty;
        this.selected = options.selected === true;
    }
}
