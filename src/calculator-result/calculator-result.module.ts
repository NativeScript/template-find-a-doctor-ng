
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { CalculatorResultRoutingModule } from "./calculator-result-routing.module";
import { SharedModule } from "../shared/shared.module";

import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { EstimateService } from "../shared/services/estimate.service";

import { CalculatorResultComponent } from "./calculator-result.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUICalendarModule,
        NativeScriptUIListViewModule,
        CalculatorResultRoutingModule,
        SharedModule
    ],
    declarations: [
        CalculatorResultComponent
    ],
    providers: [
        ModalDialogService,
        EstimateService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
    ]
})
export class CalculatorResultModule { }

