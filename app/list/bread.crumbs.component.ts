import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

export interface RoutePart {
    title: string;
    routePart: string;
    index?: number;
    inactive?: boolean;
}

@Component({
    moduleId: module.id,
    selector: 'bread-crumbs',
    templateUrl: 'bread.crumbs.component.html',
    styleUrls: ['../common.component.css'],
    styles: ['span, a { display: inline-block; }']
})
export class BreadCrumbsComponent implements OnChanges {

    @Input()
    public routeParts: RoutePart[];

    public filteredRouteParts: RoutePart[];

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.routeParts) {
            this.filteredRouteParts = this.routeParts.filter((part: RoutePart, index: number) => {
                part.index = index;
                return part.title !== '*';
            });
        }
    }

    public getRoute(index: number): string[] {
        index = this.filteredRouteParts[index].index;
        const items: string[] = [];
        for (let i = 0; i <= index; i++) {
            items.push(this.routeParts[i].routePart);
        }
        return items;
    }

    public getAdditionalRoutes(): number[] {
        const items: number[] = [];
        for (let i = 2; i < this.filteredRouteParts.length; i++) {
            if (this.filteredRouteParts[i].title !== '*') {
                items.push(i);
            }
        }
        return items;
    }

    public trackByIndex(index: number, routePart: RoutePart): number {
        return routePart.index;
    }
}