import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Procedure } from "../models/procedure.model";

@Injectable()
export class ProcedureService {

    private _procedures: Array<Procedure>;

    private _procedureStore = Kinvey.DataStore.collection<Procedure>("Services", Kinvey.DataStoreType.Network);
    private _proceduresPromise: Promise<any>;

    getProcedures(): Promise<Procedure[]> {
        if (!this._proceduresPromise) {
            this._proceduresPromise = this._procedureStore.find().toPromise()
                .then((data) => {
                    this._procedures = [];

                    if (data && data.length) {
                        data.forEach((procedureData: any) => {
                            const procedure = new Procedure(procedureData);
                            this._procedures.push(procedure);
                        });
                    }

                    return this._procedures;
                })
                .catch((error: Kinvey.BaseError) => {
                    alert({
                        title: "Oops something went wrong.",
                        message: error.message,
                        okButtonText: "Ok"
                    });
                });
        }

        return this._proceduresPromise;
    }
}
