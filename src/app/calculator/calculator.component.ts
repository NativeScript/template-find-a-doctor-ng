import { Component, ViewContainerRef, ViewChild, NgZone } from "@angular/core";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { ProcedureService } from "../shared/services/procedure.service"
import { Procedure } from "../shared/models/procedure.model";
import { SearchBar } from "ui/search-bar";
import { EventData } from "data/observable";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/ui/page/page";

@Component({
    selector: "CalculatorComponent",
    moduleId: module.id,
    templateUrl: "./calculator.component.html",
    styleUrls: ["./calculator-common.css"],
    providers: [ProcedureService]
})
export class CalculatorComponent {
    procedures: ObservableArray<any>; // TODO: ObservableArray<Procedure>;
    procedure: string = "";
    isLoading: boolean;
    hasConsentToSearch: boolean = false;
    proceduresFilter: string = "";
    procedureFilteringFunc: Function;

    @ViewChild("proceduresListView") proceduresListView: RadListViewComponent;
    @ViewChild("searchBar") searchBar: any;

    constructor(
        private _procedureService: ProcedureService,
        private _routerExtensions: RouterExtensions,
        private _ngZone: NgZone
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.procedureFilteringFunc = this.getFilteringFunc();

        this._procedureService.getProcedures().then(procedures => {
            this.procedures = new ObservableArray<Procedure>(procedures);
            this.isLoading = false;
        });
    }

    onSearchBarLayoutChange(args) {
        let sb = <SearchBar>args.object;

        if (isAndroid) {
            sb.android.clearFocus();
        }
    }

    procedureSelected(args: ListViewEventData) {
        this.procedures.forEach(item => item.selected = false);
        const selectedItems = args.object.getSelectedItems();
        const item = selectedItems && selectedItems[0];

        if (item) {
            item.selected = true;
            this.procedure = item;
        }

        this.searchBar.nativeElement.dismissSoftInput();
    }

    getFilteringFunc(): (item: Procedure) => boolean {
        const filterFunc = (item: Procedure): boolean => {
            return item.name.toLowerCase().includes(this.proceduresFilter.toLowerCase()) ||
                item.keywords.toLowerCase().includes(this.proceduresFilter.toLowerCase());
        };

        return filterFunc;
    }

    onProcedureFilterSubmit(args: EventData) {
        this.searchBar.nativeElement.dismissSoftInput();
    }

    onTextChanged(args: EventData) {
        let searchBar = <SearchBar>args.object;

        this.proceduresFilter = searchBar.text;
        this.proceduresListView.listView.refresh();
    }

    onSubmitButtonTap(args: EventData) {
        this._routerExtensions.navigate(["/calculator-result", this.procedure],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
