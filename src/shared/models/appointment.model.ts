import { Entity } from "kinvey-nativescript-sdk";

export class Appointment implements Entity {
    public _id: string;
    public pd_appointment_uuid: string;
    public appointment_id: string;
    public appointment_type: string;
    public patient: {
        first_name: string,
        last_name: string,
        _uuid: string,
        phone: string,
        member_id: string,
        birth_date: string,
        email: string
    };
    public status: string;
    public provider_scheduler_uuid: string;
    public start_date: string;
    public end_date: string;

    constructor(options: any) {
        this._id = options._id;
        this.pd_appointment_uuid = options.pd_appointment_uuid;
        this.appointment_id = options.appointment_id;
        this.appointment_type = options.appointment_type;
        this.patient = options.patient || {};
        this.status = options.status;
        this.provider_scheduler_uuid = options.provider_scheduler_uuid;
        this.start_date = options.start_date;
        this.end_date = options.end_date;
    }
}
