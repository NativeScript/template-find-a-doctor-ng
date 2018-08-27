import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SharedModule } from "../shared/shared.module";

import { CalculatorRoutingModule } from "./calculator-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CalculatorRoutingModule,
        // NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        SharedModule
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CalculatorModule { }
