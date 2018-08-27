import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CalculatorComponent } from "./calculator.component";

const routes: Routes = [
    { path: "", component: CalculatorComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CalculatorRoutingModule { }
