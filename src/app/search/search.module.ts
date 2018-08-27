import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { SearchRoutingModule } from "./search-routing.module";

import { SpecialtyService } from "./shared/specialty.service";
import { ProviderService } from "../shared/services/provider.service";

import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        SearchRoutingModule,
        SharedModule
    ],
    providers: [
        SpecialtyService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
