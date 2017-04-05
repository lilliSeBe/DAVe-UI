import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ErrorResponse} from '../http.service';

import {AccountMarginService} from './account.margin.service';
import {AccountMarginData, AccountMarginParams} from './account.margin.types';

import {AbstractLatestListComponent} from '../list/abstract.latest.list.component';
import {ExportColumn} from '../list/download.menu.component';
import {OrderingCriteria, OrderingValueGetter} from '../datatable/data.table.column.directive';
import {ACCOUNT_MARGIN_LATEST} from '../routes/routing.paths';

export const routingKeys: (keyof AccountMarginParams)[] = ['clearer', 'member', 'account', 'marginCurrency'];

@Component({
    moduleId   : module.id,
    templateUrl: 'account.margin.latest.component.html',
    styleUrls  : ['../common.component.css']
})
export class AccountMarginLatestComponent extends AbstractLatestListComponent<AccountMarginData> {

    constructor(private accountMarginService: AccountMarginService,
        route: ActivatedRoute) {
        super(route);
    }

    protected loadData(): void {
        this.accountMarginService.getAccountMarginLatest({
            clearer       : this.routeParams['clearer'],
            member        : this.routeParams['member'],
            account       : this.routeParams['account'],
            marginCurrency: this.routeParams['marginCurrency']
        }).subscribe(
            (rows: AccountMarginData[]) => {
                this.processData(rows);
            },
            (err: ErrorResponse) => {
                this.errorMessage = 'Server returned status ' + err.status;
                this.initialLoad = false;
            });
    }

    public get defaultOrdering(): (OrderingCriteria<AccountMarginData> | OrderingValueGetter<AccountMarginData>)[] {
        return defaultOrdering;
    }

    public get exportKeys(): ExportColumn<AccountMarginData>[] {
        return exportKeys;
    }

    protected get routingKeys(): string[] {
        return routingKeys;
    }

    public get rootRouteTitle(): string {
        return 'Latest Account Margin';
    }

    protected get rootRoutePath(): string {
        return '/' + ACCOUNT_MARGIN_LATEST;
    }

    public get valueGetters() {
        return valueGetters;
    }
}

//<editor-fold defaultstate="collapsed" desc="Value getters, default ordering, exported columns">

export const valueGetters = {
    clearer                    : (row: AccountMarginData) => row.clearer,
    member                     : (row: AccountMarginData) => row.member,
    account                    : (row: AccountMarginData) => row.account,
    marginCurrency             : (row: AccountMarginData) => row.marginCurrency,
    clearingCurrency           : (row: AccountMarginData) => row.clearingCurrency,
    pool                       : (row: AccountMarginData) => row.pool,
    marginReqInMarginCurr      : (row: AccountMarginData) => row.marginReqInMarginCurr,
    marginReqInClrCurr         : (row: AccountMarginData) => row.marginReqInClrCurr,
    unadjustedMarginRequirement: (row: AccountMarginData) => row.unadjustedMarginRequirement,
    variationPremiumPayment    : (row: AccountMarginData) => row.variationPremiumPayment,
    received                   : (row: AccountMarginData) => row.received
};

const defaultOrdering: (OrderingCriteria<AccountMarginData> | OrderingValueGetter<AccountMarginData>)[] = [
    {
        get       : valueGetters.marginReqInMarginCurr,
        descending: true
    },
    valueGetters.clearer,
    valueGetters.member,
    valueGetters.account,
    valueGetters.marginCurrency
];

export const exportKeys: ExportColumn<AccountMarginData>[] = [
    {
        get   : valueGetters.clearer,
        header: 'Clearer'
    },
    {
        get   : valueGetters.member,
        header: 'Member / Client'
    },
    {
        get   : valueGetters.account,
        header: 'Account'
    },
    {
        get   : valueGetters.marginCurrency,
        header: 'Margin currency'
    },
    {
        get   : valueGetters.clearingCurrency,
        header: 'Clearing currency'
    },
    {
        get   : valueGetters.pool,
        header: 'Collateral Pool'
    },
    {
        get   : (row: AccountMarginData) => row.businessDate,
        header: 'Business date'
    },
    {
        get   : valueGetters.marginReqInMarginCurr,
        header: 'Margin requirement in margin currency'
    },
    {
        get   : valueGetters.marginReqInClrCurr,
        header: 'Margin requirement in clearing currency'
    },
    {
        get   : valueGetters.unadjustedMarginRequirement,
        header: 'Unadjusted Margin'
    },
    {
        get   : (row: AccountMarginData) => row.variationPremiumPayment,
        header: 'Variation Premium Payment'
    },
    {
        get   : valueGetters.received,
        header: 'Last update'
    }
];

//</editor-fold>