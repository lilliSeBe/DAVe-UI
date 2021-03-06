import {DecimalPipe} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ErrorResponse} from '../http.service';

import {MarginShortfallSurplusService} from './margin.shortfall.surplus.service';
import {MarginShortfallSurplusData} from './margin.types';

import {DateFormatter} from '../common/common.module';
import {AbstractHistoryListComponent, LineChartColumn} from '../list/abstract.history.list.component';
import {RoutePart} from '../list/bread.crumbs.component';
import {ExportColumn} from '../list/download.menu.component';
import {OrderingCriteria, OrderingValueGetter} from '../datatable/data.table.column.directive';

import {exportKeys, routingKeys, valueGetters} from './margin.shortfall.surplus.latest.component';

@Component({
    moduleId: module.id,
    templateUrl: 'margin.shortfall.surplus.history.component.html',
    styleUrls: ['../common.component.css']
})
export class MarginShortfallSurplusHistoryComponent extends AbstractHistoryListComponent<MarginShortfallSurplusData> {

    constructor(private marginShortfallSurplusService: MarginShortfallSurplusService,
                route: ActivatedRoute, dateFormatter: DateFormatter, numberPipe: DecimalPipe) {
        super(route, dateFormatter, numberPipe);
    }

    protected loadData(): void {
        this.marginShortfallSurplusService.getShortfallSurplusHistory(this.routeParams['clearer'], this.routeParams['pool'],
            this.routeParams['member'], this.routeParams['clearingCcy'], this.routeParams['ccy'])
            .subscribe(
                (rows: MarginShortfallSurplusData[]) => {
                    this.processData(rows);
                },
                (err: ErrorResponse) => {
                    this.errorMessage = 'Server returned status ' + err.status;
                    this.initialLoad = false;
                });
    }

    protected getTickFromRecord(record: MarginShortfallSurplusData): LineChartColumn[] {
        return [
            {
                type: 'date',
                value: record.received
            },
            {
                label: 'Margin Requirement',
                type: 'number',
                value: record.marginRequirement,
            },
            {
                label: 'Security Collateral',
                type: 'number',
                value: record.securityCollateral,
            },
            {
                label: 'Cash Balance',
                type: 'number',
                value: record.cashBalance,
            },
            {
                label: 'Shortfall Surplus',
                type: 'number',
                value: record.shortfallSurplus,
            },
            {
                label: 'Margin Call',
                type: 'number',
                value: record.marginCall,
            }
        ];
    }

    protected createRoutePart(title: string, routePath: string, key: string, index: number): RoutePart {
        if (key === 'ccy') {
            let part: RoutePart = super.createRoutePart(title, routePath, key, index);
            part.inactive = true;
            return part;
        }
        return super.createRoutePart(title, routePath, key, index)
    }

    public get defaultOrdering(): (OrderingCriteria<MarginShortfallSurplusData> | OrderingValueGetter<MarginShortfallSurplusData>)[] {
        return defaultOrdering;
    }

    public get exportKeys(): ExportColumn<MarginShortfallSurplusData>[] {
        return exportKeys;
    }

    protected get routingKeys(): string[] {
        return routingKeys.concat(['ccy']);
    }

    public get rootRouteTitle(): string {
        return 'Margin Shortfall Surplus History';
    }

    protected get rootRoutePath(): string {
        return '/marginShortfallSurplusLatest';
    }

    public get valueGetters() {
        return valueGetters;
    }
}

//<editor-fold defaultstate="collapsed" desc="Value getters, default ordering, exported columns">

const defaultOrdering: (OrderingCriteria<MarginShortfallSurplusData> | OrderingValueGetter<MarginShortfallSurplusData>)[] = [{
    get: valueGetters.received,
    descending: true
}];

//</editor-fold>
