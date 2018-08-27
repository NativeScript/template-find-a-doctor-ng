import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

const routes: Routes = [
    { path: "", redirectTo: "/root", pathMatch: "full" },
    { path: "root", loadChildren: "~/app/root/root.module#RootModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "calculator", loadChildren: "~/app/calculator/calculator.module#CalculatorModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "plan", loadChildren: "~/app/plan/plan.module#PlanModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "results", loadChildren: "~/app/results/results.module#ResultsModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "calculator-result", loadChildren: "~/app/calculator-result/calculator-result.module#CalculatorResultModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
