import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Estimate } from "../models/estimate.model";
import { Procedure } from "../../shared/models/procedure.model";

@Injectable()
export class EstimateService {

    private _estimates: Array<Estimate>;
    private _estimatesPromise: Promise<any>;
    private _oopStore = Kinvey.DataStore.collection<Procedure>("OOP", Kinvey.DataStoreType.Network);

    getEstimates(procedure: Procedure): Promise<any> {
        const estimatesQuery = new Kinvey.Query();
        estimatesQuery.equalTo("service_id", procedure._id);

        return this._oopStore.find(estimatesQuery).toPromise()
            .then((data) => {
                this._estimates = [];

                if (data && data.length) {
                    data.forEach((estimateData: any) => {
                        const estimate = new Estimate(estimateData);
                        this._estimates.push(estimate);
                    });
                }
                return this._estimates;
            })
            .catch((error: Kinvey.BaseError) => {
                alert({
                    title: "Oops something went wrong.",
                    message: error.message,
                    okButtonText: "Ok"
                });
            });
    }
}
