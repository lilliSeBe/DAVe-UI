import {DecimalPipe} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ErrorResponse} from '../http.service';

import {MarginComponentsService} from './margin.components.service';
import {MarginComponentsRowData} from './margin.types';

import {DateFormatter} from '../common/common.module';
import {AbstractHistoryListComponent, LineChartColumn} from '../list/abstract.history.list.component';
import {ExportColumn} from '../list/download.menu.component';
import {OrderingCriteria} from '../datatable/data.table.column.directive';

import {exportKeys, routingKeys, valueGetters} from './margin.components.latest.component';

@Component({
    moduleId: module.id,
    templateUrl: 'margin.components.history.component.html',
    styleUrls: ['../common.component.css']
})
export class MarginComponentsHistoryComponent extends AbstractHistoryListComponent<MarginComponentsRowData> {

    constructor(private marginComponentsService: MarginComponentsService,
                route: ActivatedRoute, dateFormatter: DateFormatter, numberPipe: DecimalPipe) {
        super(route, dateFormatter, numberPipe);
    }

    protected loadData(): void {
        this.marginComponentsService.getMarginComponentsHistory(this.routeParams['clearer'], this.routeParams['member'],
            this.routeParams['account'], this.routeParams['class'], this.routeParams['ccy'])
            .subscribe(
                (rows: MarginComponentsRowData[]) => {
                    this.processData(rows);
                }, (err: ErrorResponse) => {
                    this.errorMessage = 'Server returned status ' + err.status;
                    this.initialLoad = false;
                });
    }

    protected getTickFromRecord(record: MarginComponentsRowData): LineChartColumn[] {
        return [
            {
                type: 'date',
                value: record.received
            },
            {
                label: 'Variation / Liquidation Marign',
                type: 'number',
                value: record.variLiqui,
            },
            {
                label: 'Premium Margin',
                type: 'number',
                value: record.premiumMargin,
            },
            {
                label: 'Spread Margin',
                type: 'number',
                value: record.spreadMargin,
            },
            {
                label: 'Total Margin',
                type: 'number',
                value: record.additionalMargin,
            }
        ];
    }

    public get defaultOrdering(): OrderingCriteria<MarginComponentsRowData>[] {
        return defaultOrdering;
    }

    public get exportKeys(): ExportColumn<MarginComponentsRowData>[] {
        return exportKeys;
    }

    protected get routingKeys(): string[] {
        return routingKeys;
    }

    public get rootRouteTitle(): string {
        return 'Margin Components History';
    }

    protected get rootRoutePath(): string {
        return '/marginComponentLatest';
    }

    public get valueGetters() {
        return valueGetters;
    }
}

//<editor-fold defaultstate="collapsed" desc="Value getters, default ordering, exported columns">

const defaultOrdering: OrderingCriteria<MarginComponentsRowData>[] = [{
    get: valueGetters.received,
    descending: true
}];

//</editor-fold>
