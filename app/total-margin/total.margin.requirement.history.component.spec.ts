import {ActivatedRoute} from '@angular/router';

import {async, TestBed, fakeAsync, inject} from '@angular/core/testing';

import {
    ActivatedRouteStub,
    HistoryListPage,
    TableBodyRow,
    HttpAsyncServiceStub,
    generateTotalMarginHistory,
    chceckSorting
} from '../../testing';

import {TotalMarginServerData} from './total.margin.types';
import {TotalMarginService} from './total.margin.service';
import {HttpService} from '../http.service';

import {DATA_REFRESH_INTERVAL} from '../abstract.component';
import {ExportColumn} from '../list/download.menu.component';

import {valueGetters, exportKeys} from './total.margin.requirement.latest.component';
import {TotalMarginRequirementHistoryComponent} from './total.margin.requirement.history.component';

describe('Total margin history component', () => {
    let page: HistoryListPage<TotalMarginRequirementHistoryComponent>;
    let testingParams = ['A', '*', 'B', 'C', '*'];

    beforeEach(async(() => {
        HistoryListPage.initTestBed(TotalMarginRequirementHistoryComponent, TotalMarginService);
    }));

    beforeEach(fakeAsync(inject([HttpService, ActivatedRoute],
        (http: HttpAsyncServiceStub<TotalMarginServerData[]>, activatedRoute: ActivatedRouteStub) => {
            // Generate test data
            http.returnValue(generateTotalMarginHistory());

            // Set input parameters
            activatedRoute.testParams = {
                clearer: testingParams[0],
                pool: testingParams[1],
                member: testingParams[2],
                account: testingParams[3],
                ccy: testingParams[4]
            };

            // Create component
            page = new HistoryListPage<TotalMarginRequirementHistoryComponent>(
                TestBed.createComponent(TotalMarginRequirementHistoryComponent));
        })));

    it('displays error correctly', fakeAsync(inject([HttpService],
        (http: HttpAsyncServiceStub<TotalMarginServerData[]>) => {
            // Init component
            page.detectChanges();
            // Do not trigger periodic interval
            clearInterval((page.component as any).intervalHandle);

            expect(page.initialLoadComponent).not.toBeNull('Initial load component visible.');
            expect(page.noDataComponent).toBeNull('No data component not visible.');
            expect(page.updateFailedComponent).toBeNull('Update failed component not visible.');
            expect(page.dataTable.element).toBeNull('Data table not visible.');
            expect(page.lineChart).toBeNull('Chart not visible.');

            // Return error
            http.throwError({
                status: 500,
                message: 'Error message'
            });
            page.advanceHTTP();

            expect(page.initialLoadComponent).toBeNull('Initial load component not visible.');
            expect(page.noDataComponent).toBeNull('No data component not visible.');
            expect(page.updateFailedComponent).not.toBeNull('Update failed component visible.');
            expect(page.dataTable.element).toBeNull('Data table not visible.');
            expect(page.lineChart).toBeNull('Chart not visible.');
        })));

    it('displays no-data correctly', fakeAsync(inject([HttpService],
        (http: HttpAsyncServiceStub<TotalMarginServerData[]>) => {
            // Init component
            page.detectChanges();
            // Do not trigger periodic interval
            clearInterval((page.component as any).intervalHandle);

            expect(page.initialLoadComponent).not.toBeNull('Initial load component visible.');
            expect(page.noDataComponent).toBeNull('No data component not visible.');
            expect(page.updateFailedComponent).toBeNull('Update failed component not visible.');
            expect(page.dataTable.element).toBeNull('Data table not visible.');
            expect(page.lineChart).toBeNull('Chart not visible.');

            // Return no data
            http.popReturnValue(); // Remove from queue
            http.returnValue([]); // Push empty array
            page.advanceHTTP();

            expect(page.initialLoadComponent).toBeNull('Initial load component not visible.');
            expect(page.noDataComponent).not.toBeNull('No data component visible.');
            expect(page.updateFailedComponent).toBeNull('Update failed component not visible.');
            expect(page.dataTable.element).toBeNull('Data table not visible.');
            expect(page.lineChart).toBeNull('Chart not visible.');
        })));

    it('displays data table', fakeAsync(inject([HttpService],
        (http: HttpAsyncServiceStub<TotalMarginServerData[]>) => {
            let httpSpy = spyOn(http, 'get').and.callThrough();
            // Init component
            page.detectChanges();
            // Do not trigger periodic interval
            clearInterval((page.component as any).intervalHandle);

            expect(page.initialLoadComponent).not.toBeNull('Initial load component visible.');
            expect(page.noDataComponent).toBeNull('No data component not visible.');
            expect(page.updateFailedComponent).toBeNull('Update failed component not visible.');
            expect(page.dataTable.element).toBeNull('Data table not visible.');
            expect(page.lineChart).toBeNull('Chart not visible.');

            // Return data
            page.advanceHTTP();

            expect(httpSpy).toHaveBeenCalled();
            expect(httpSpy.calls.mostRecent().args[0].params).toEqual(testingParams);

            expect(page.initialLoadComponent).toBeNull('Initial load component not visible.');
            expect(page.noDataComponent).toBeNull('No data component not visible.');
            expect(page.updateFailedComponent).toBeNull('Update failed component not visible.');
            expect(page.dataTable.element).not.toBeNull('Data table visible.');
            expect(page.lineChart).not.toBeNull('Chart visible.');

            // Fire highlighters
            page.advanceHighlighter();
        })));

    it('data correctly refreshed', fakeAsync(inject([HttpService],
        (http: HttpAsyncServiceStub<TotalMarginServerData[]>) => {
            // Init component
            page.detectChanges();
            // Return data
            page.advanceHTTP();

            expect(page.initialLoadComponent).toBeNull('Initial load component not visible.');
            expect(page.noDataComponent).toBeNull('No data component not visible.');
            expect(page.updateFailedComponent).toBeNull('Update failed component not visible.');
            expect(page.dataTable.element).not.toBeNull('Data table visible.');
            expect(page.lineChart).not.toBeNull('Chart visible.');

            expect(page.dataTable.body.rows.every((row: TableBodyRow) => {
                return row.highlighted;
            })).toBeTruthy('All rows are highlighted');

            // Fire highlighters
            page.advanceHighlighter();

            expect(page.dataTable.body.rows.every((row: TableBodyRow) => {
                return !row.highlighted;
            })).toBeTruthy('No rows are highlighted');

            // Push new data
            let newData = generateTotalMarginHistory();
            http.returnValue(newData);
            // Trigger reload
            page.advanceAndDetectChangesUsingOffset(DATA_REFRESH_INTERVAL);
            page.advanceHTTP();

            expect(page.dataTable.element).not.toBeNull('Data table visible.');
            expect(page.lineChart).not.toBeNull('Chart visible.');

            expect(page.dataTable.body.rows.every((row: TableBodyRow) => {
                return row.highlighted;
            })).toBeTruthy('All rows are highlighted');

            // Fire highlighters
            page.advanceHighlighter();

            expect(page.dataTable.body.rows.every((row: TableBodyRow) => {
                return !row.highlighted;
            })).toBeTruthy('No rows are highlighted');

            // Return the same data
            http.returnValue(newData);
            // Trigger reload
            page.advanceAndDetectChangesUsingOffset(DATA_REFRESH_INTERVAL);
            page.advanceHTTP();

            expect(page.dataTable.body.rows.every((row: TableBodyRow) => {
                return !row.highlighted;
            })).toBeTruthy('No rows are highlighted');

            // Do not trigger periodic interval
            clearInterval((page.component as any).intervalHandle);
        })));

    it('has correct pager', fakeAsync(inject([HttpService], (http: HttpAsyncServiceStub<TotalMarginServerData[]>) => {
        // Init component
        page.detectChanges();
        // Return data
        page.advanceHTTP();
        // Fire highlighters
        page.advanceHighlighter();

        expect(page.dataTable.pager.element).toBeNull('Pager not visible');
        expect(page.dataTable.recordsCount.message).toContain('Showing 16 records out of 16');

        let newData = generateTotalMarginHistory()
            .concat(generateTotalMarginHistory())
            .concat(generateTotalMarginHistory());
        http.returnValue(newData);
        // Trigger reload
        page.advanceAndDetectChangesUsingOffset(DATA_REFRESH_INTERVAL);
        page.advanceHTTP();
        page.detectChanges();

        expect(page.dataTable.pager.element).not.toBeNull('Pager visible');
        expect(page.dataTable.recordsCount.message).toContain('Showing 20 records out of ' + 3 * 16);

        page.dataTable.pager.expectButtonNumbers([1, 2, 3]);
        page.dataTable.pager.expectButtonActive(2);
        page.dataTable.pager.expectLeadingButtonsDisabled();
        page.dataTable.pager.expectTrailingButtonsNotDisabled();

        page.dataTable.pager.click(4);

        page.dataTable.pager.expectButtonNumbers([1, 2, 3]);
        page.dataTable.pager.expectButtonActive(4);
        page.dataTable.pager.expectLeadingButtonsNotDisabled();
        page.dataTable.pager.expectTrailingButtonsDisabled();

        // Fire highlighters
        page.advanceHighlighter();
        // Do not trigger periodic interval
        clearInterval((page.component as any).intervalHandle);
    })));

    describe('(after data are ready)', () => {
        beforeEach(fakeAsync(() => {
            // Init component
            page.detectChanges();
            // Return data
            page.advanceHTTP();
            // Do not trigger periodic interval
            clearInterval((page.component as any).intervalHandle);

            // Fire highlighters
            page.advanceHighlighter();
        }));

        xit('displays data correctly', fakeAsync(() => {
        }));

        xit('has chart data correctly processed', fakeAsync(() => {
        }));

        it('has correct breadcrumbs navigation', fakeAsync(inject([ActivatedRoute],
            (activatedRoute: ActivatedRouteStub) => {
                page.checkBreadCrumbs(testingParams, '/totalMarginRequirementLatest',
                    'Total Margin Requirement History', false);

                let routeParams = ['A', 'B', 'C', 'D', 'E'];

                activatedRoute.testParams = {
                    clearer: routeParams[0],
                    pool: routeParams[1],
                    member: routeParams[2],
                    account: routeParams[3],
                    ccy: routeParams[4]
                };
                page.detectChanges();

                page.checkBreadCrumbs(routeParams, '/totalMarginRequirementLatest',
                    'Total Margin Requirement History', false);
            })));

        it('has download working', fakeAsync(() => {
            let downloadLink = page.downloadMenu;
            downloadLink.click();

            expect(downloadLink.saveSpy).toHaveBeenCalled();
            expect(downloadLink.blobSpy).toHaveBeenCalled();
            let exportedData = downloadLink.blobSpy.calls.mostRecent().args[0][0];
            expect(exportedData).not.toBeNull();
            expect(exportedData.split('\n')[0]).toEqual(exportKeys.map(
                (key: ExportColumn<any>) => key.header).join(','));
            expect(exportedData.split('\n')[1]).toContain(exportKeys.slice(0, exportKeys.length - 1).map(
                (key: ExportColumn<any>) =>
                    key.get(page.dataTable.data[0]) ? key.get(page.dataTable.data[0]).toString() : '')
                .join(','));
            let cells = exportedData.split('\n')[1].split(',');
            expect(cells[cells.length - 1])
                .toMatch(/^\d{2}\. \d{2}\. \d{4} \d{2}:\d{2}:\d{2}$/);
            expect(exportedData.split('\n').length).toBe(18);
        }));

        it('can be sorted correctly', fakeAsync(() => {
            chceckSorting(page, [valueGetters.received, valueGetters.adjustedMargin, valueGetters.unadjustedMargin]);
        }));
    });
});