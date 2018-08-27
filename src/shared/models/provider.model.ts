import { Entity } from "kinvey-nativescript-sdk";

export class ProviderLocation {
    public address_lines: Array<string>;
    public city: string;
    public geo_location: Array<Number>;
    public phone: string;
    public role: Array<string>;
    public state: string;
    public zipcode: string;
}

export class ProviderResidency {
    public institution_name: string;
    public to_year?: Number;
    public type: string;
}

export class ProviderLicense {
    public expiration_date?: string;
    public number: string;
    public state: string;
    public status?: string;
    public verified?: string;
}

export class Provider implements Entity {
    public _id: string;
    public birth_date: string;
    public degree: string;
    public description: string;
    public education: {
        graduation_year: Number,
        medical_school: string
    };
    public fax: string;
    public first_name: string;
    public gender: string;
    public last_name: string;
    public licenses: Array<ProviderLicense>;
    public licensures: Array<ProviderLicense>;
    public locations: Array<ProviderLocation>;
    public middle_name: string;
    public npi: string;
    public phone: string;
    public prefix: string;
    public residencies: Array<ProviderResidency>;
    public small_image_url: string;
    public specialty: Array<string>;
    public specialty_primary: Array<string>;
    public specialty_secondary: Array<string>;

    constructor (options: any) {
        this._id = options._id;
        this.birth_date = options.birth_date;
        this.degree = options.degree;
        this.description = options.description;
        this.education = options.education;
        this.fax = options.fax;
        this.first_name = options.first_name;
        this.gender = options.gender;
        this.last_name = options.last_name;
        this.licenses = options.licenses || [];
        this.licensures = options.licensures || [];
        this.locations = options.locations || [];
        this.middle_name = options.middle_name;
        this.npi = options.npi;
        this.phone = options.phone;
        this.prefix = options.prefix;
        this.residencies = options.residencies || [];
        this.small_image_url = options.small_image_url;
        this.specialty = options.specialty || [];
        this.specialty_primary = options.specialty_primary || [];
        this.specialty_secondary = options.specialty_secondary || [];
    }
}
