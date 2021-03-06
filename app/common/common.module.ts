import {DatePipe, DecimalPipe} from '@angular/common';
import {NgModule, Inject, OpaqueToken} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {InitialLoadComponent} from './initial.load.component';
import {NoDataComponent} from './no.data.component';
import {UpdateFailedComponent} from './update.failed.component';

import {GoogleChart} from './google.chart.component';
import {GoogleLineChart} from './google.line.chart.component';

import {PercentPipe} from './percent.pipe';

export const DATE_FORMAT = new OpaqueToken('dave.dateFormat');

export class DateFormatter {

    constructor(@Inject(DATE_FORMAT) private format: string, private datePipe: DatePipe) {
    }

    public transform(value: Date): string {
        return this.datePipe.transform(value, this.format);
    }
}

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        GoogleChart,
        GoogleLineChart,
        InitialLoadComponent,
        NoDataComponent,
        UpdateFailedComponent,
        PercentPipe
    ],
    exports: [
        GoogleChart,
        GoogleLineChart,
        InitialLoadComponent,
        NoDataComponent,
        UpdateFailedComponent,
        PercentPipe
    ],
    providers: [
        DecimalPipe,
        DatePipe,
        DateFormatter,
        {provide: DATE_FORMAT, useValue: 'dd. MM. yyyy HH:mm:ss'}
    ]
})
export class CommonModule {
}