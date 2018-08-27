import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppointmentService } from "./services/appointment.service";
import { ProviderService } from "./services/provider.service";
import { PlanService } from "./services/plan.service";

import { SearchComponent } from "../search/search.component";
import { PlanComponent } from "../plan/plan.component";
import { CalculatorComponent } from "../calculator/calculator.component";

@NgModule({
    imports: [
        NativeScriptUIListViewModule,
        NativeScriptCommonModule, 
        NativeScriptFormsModule
    ],
    declarations: [
        SearchComponent,
        PlanComponent,
        CalculatorComponent
    ],
    providers: [
        AppointmentService,
        ProviderService,
        PlanService
    ],
    exports: [
        NativeScriptUIListViewModule,
        SearchComponent,
        PlanComponent,
        CalculatorComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
