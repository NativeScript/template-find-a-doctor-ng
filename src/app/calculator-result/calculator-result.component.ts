import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { EstimateService } from "../shared/services/estimate.service";
import { Estimate } from "../shared/models/estimate.model";
import { Procedure } from "~/shared/models/procedure.model";

@Component({
	selector: "CalculatorResultComponent",
	moduleId: module.id,
	templateUrl: "./calculator-result.component.html",
	styleUrls: ["./calculator-result-common.css"]
})
export class CalculatorResultComponent {
	procedure: Procedure;
	title: string;
	isLoading: boolean;
	resultItems: Array<Estimate>;
	lowestPrice: number;
	highestPrice: number;

	constructor(
		private _estimateService: EstimateService,
		private _activatedRoute: ActivatedRoute,
		private _routerExtensions: RouterExtensions
	) { }

	ngOnInit(): void {
		this.isLoading = true;

		this._activatedRoute.params.subscribe(params => {
			params = params || {};
			this.procedure = <Procedure>params;
			this.title = this.procedure.name;
			this._estimateService.getEstimates(this.procedure)
				.then(estimates => {
					this.isLoading = false;
					this.resultItems = estimates;
				});
		});
	}

	onBackButtonTap(): void {
		this._routerExtensions.backToPreviousPage();
	}

	getLowestPrice(estimates: Array<Estimate>): number {
		return estimates ? Math.min(...estimates.map(estimate => estimate.priceLow)) : 0;
	}

	getHighestPrice(estimates: Array<Estimate>): number {
		return estimates ? Math.max(...estimates.map(estimate => estimate.priceHigh)) : 0;
	}
}
