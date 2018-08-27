import { Entity } from "kinvey-nativescript-sdk";

export class PlanPremium {
    public adults: number;
    public age: number;
    public children: number;
    public cost: number;
}

export class Plan implements Entity {
    public _id: string;
    public benefits_summary_url: string;
    public county: string;
    public customer_service_phone: string;
    public deductible: {
        family: number,
        individual: number
    };
    public max_out_of_pocket: {
        family: number,
        individual: number
    };
    public metallic_level: string;
    public plan_id: string;
    public plan_name: string;
    public plan_type: string;
    public premiums: Array<PlanPremium>;
    public public_exchange: boolean;
    public state: string;
    public trading_partner_id: string;
    public profile_image: string;

    constructor(options: any) {
        this._id = options._id;
        this.benefits_summary_url = options.benefits_summary_url || "";
        this.county = options.county || "";
        this.customer_service_phone = options.customer_service_phone || "";
        this.deductible = options.deductible || {};
        this.max_out_of_pocket = options.max_out_of_pocket || {};
        this.metallic_level = options.metallic_level || "";
        this.plan_id = options.plan_id || "";
        this.plan_name = options.plan_name || "";
        this.plan_type = options.plan_type || "";
        this.premiums = options.premiums || [];
        this.public_exchange = options.public_exchange;
        this.state = options.state || "";
        this.trading_partner_id = options.trading_partner_id || "";
        this.profile_image = "";
    }
}
