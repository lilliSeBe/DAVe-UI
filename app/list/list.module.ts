import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {CommonModule} from '../common/common.module';

import {DownloadMenuComponent} from './download.menu.component';
import {BreadCrumbsComponent} from './bread.crumbs.component';
import {ListComponent} from './list.component';
import {DrilldownButtonComponent} from './drilldown.button.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        ListComponent,
        DownloadMenuComponent,
        BreadCrumbsComponent,
        DrilldownButtonComponent
    ],
    exports: [
        ListComponent
    ]
})
export class ListModule {
}