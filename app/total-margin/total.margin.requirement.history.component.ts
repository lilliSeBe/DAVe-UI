import {DecimalPipe} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ErrorResponse} from '../http.service';

import {TotalMarginService} from './total.margin.service';
import {TotalMarginData} from './total.margin.types';

import {DateFormatter} from '../common/common.module';
import {AbstractHistoryListComponent, LineChartColumn} from '../list/abstract.history.list.component';
import {ExportColumn} from '../list/download.menu.component';
import {OrderingCriteria, OrderingValueGetter} from '../datatable/data.table.column.directive';

import {exportKeys, routingKeys, valueGetters} from './total.margin.requirement.latest.component';

@Component({
    moduleId: module.id,
    templateUrl: 'total.margin.requirement.history.component.html',
    styleUrls: ['../common.component.css']
})
export class TotalMarginRequirementHistoryComponent extends AbstractHistoryListComponent<TotalMarginData> {

    constructor(private totalMarginService: TotalMarginService,
                route: ActivatedRoute, dateFormatter: DateFormatter, numberPipe: DecimalPipe) {
        super(route, dateFormatter, numberPipe);
    }

    protected loadData(): void {
        this.totalMarginService.getTotalMarginHistory(this.routeParams['clearer'], this.routeParams['pool'],
            this.routeParams['member'], this.routeParams['account'], this.routeParams['ccy'])
            .subscribe(
                (rows: TotalMarginData[]) => {
                    this.processData(rows);
                },
                (err: ErrorResponse) => {
                    this.errorMessage = 'Server returned status ' + err.status;
                    this.initialLoad = false;
                });
    }


    protected getTickFromRecord(record: TotalMarginData): LineChartColumn[] {
        return [
            {
                type: 'date',
                value: record.received
            },
            {
                label: 'Adjusted Marign',
                type: 'number',
                value: record.adjustedMargin,
            },
            {
                label: 'Unadjusted Margin',
                type: 'number',
                value: record.unadjustedMargin,
            }
        ]
    }

    public get defaultOrdering(): (OrderingCriteria<TotalMarginData> | OrderingValueGetter<TotalMarginData>)[] {
        return defaultOrdering;
    }

    public get exportKeys(): ExportColumn<TotalMarginData>[] {
        return exportKeys;
    }

    protected get routingKeys(): string[] {
        return routingKeys;
    }

    public get rootRouteTitle(): string {
        return 'Total Margin Requirement History';
    }

    protected get rootRoutePath(): string {
        return '/totalMarginRequirementLatest';
    }

    public get valueGetters() {
        return valueGetters;
    }
}

//<editor-fold defaultstate="collapsed" desc="Value getters, default ordering, exported columns">

const defaultOrdering: (OrderingCriteria<TotalMarginData> | OrderingValueGetter<TotalMarginData>)[] = [{
    get: valueGetters.received,
    descending: true
}];

//</editor-fold>
