import {Directive, ElementRef, OnInit, Input, OnDestroy} from '@angular/core';

export const HIGHLIGHTER_CLASS = 'bg-warning';
export const HIGHLIGHTER_TIMEOUT = 15000;

@Directive({
    selector: '[highlighter]'
})
export class HighlighterDirective implements OnInit, OnDestroy {

    @Input('highlighter')
    public trackBy: (index: number, row: any) => any;

    @Input()
    public context: {row: any, storage: any, index: number};

    private el: HTMLElement;

    private _timeoutRef: NodeJS.Timer;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    public ngOnInit(): void {
        if (this.trackBy && this.context && this.context.storage) {
            let rowKey = this.trackBy(this.context.index, this.context.row);
            if (!this.context.storage[rowKey]) {
                this.context.storage[rowKey] = true;
                this.el.classList.add(HIGHLIGHTER_CLASS);
                this._timeoutRef = setTimeout(() => {
                    this.el.classList.remove(HIGHLIGHTER_CLASS)
                }, HIGHLIGHTER_TIMEOUT);
            }
        }
    }

    public ngOnDestroy(): void {
        if (this._timeoutRef) {
            clearTimeout(this._timeoutRef);
        }
    }
}