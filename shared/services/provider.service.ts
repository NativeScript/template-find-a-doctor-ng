import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Observable } from "rxjs/Rx";
import { Provider } from "../../shared/models/provider.model";


@Injectable()
export class ProviderService {
    private _providerStore = Kinvey.DataStore.collection<Provider>("Providers");

    getProviderByNpi(npi: string): Promise<Provider> {
        const npiQuery = new Kinvey.Query();
        npiQuery.equalTo("npi", npi);

        return this._providerStore.find(npiQuery).toPromise()
            .then(data => {
                // TODO: remove when received images display OK
                data[0].small_image_url = "https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/Author-images/sam_basu.jpg";
                return data.length ? data[0] as Provider : null;
            })
            .catch((error: Kinvey.BaseError) => {
                alert({
                    title: "Oops something went wrong.",
                    message: error.message,
                    okButtonText: "Ok"
                });
                return null;
            });
    }
    findProviders(specialty: string, zipCode: string): Promise<Provider[]> {
        const query = new Kinvey.Query();
        if (specialty) {
            query.equalTo("specialty", specialty);
        }
        if (zipCode) {
            (specialty ? query.and() : query).equalTo("locations.zipcode", zipCode);
        }

        const providersPromise = this._providerStore.find(query).toPromise()
            .then((data) => {
                const providers = [];

                if (data && data.length) {
                    data.forEach((providerData: any) => {
                        const provider = new Provider(providerData);
                        // TODO: remove when received images display OK
                        provider.small_image_url = "https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/Author-images/sam_basu.jpg";
                        providers.push(provider);
                    });
                }

                return providers;
            })
            .catch((error: Kinvey.BaseError) => {
                alert({
                    title: "Oops something went wrong.",
                    message: error.message,
                    okButtonText: "Ok"
                });
                return null;
            });

        return providersPromise;
    }

    getProviders(): Promise<Provider[]> {
        return this.findProviders(null, null);
    }
}
