import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ResultsComponent } from "./results.component";
import { ResultDetailComponent } from "./result-detail/result-detail.component";

const routes: Routes = [
    { path: "", component: ResultsComponent },
    { path: "result-detail", component: ResultDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ResultsRoutingModule { }
