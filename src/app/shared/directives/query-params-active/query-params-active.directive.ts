import { Directive, Input, OnInit, Renderer2, ElementRef } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Directive({
    selector: "[acpQueryParamsActive]"
})
export class QueryParamsActiveDirective implements OnInit {
    @Input() qpClassName: string = "active";
    @Input() param: string;
    @Input() paramContainer: string;
    isActive: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private _renderer: Renderer2,
        private elem: ElementRef
    ) {}

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.onParamsChange(params);
        });
    }
    onParamsChange(params: Params) {
        if (this.param !== undefined)
            if (params.get(this.paramContainer)) {
                const container = JSON.parse(
                    `[${params.get(this.paramContainer)}]`
                );

                if (
                    container.filter(
                        el => el.toString() === this.param.toString()
                    ).length === 1
                ) {
                    this._renderer.addClass(
                        this.elem.nativeElement,
                        this.qpClassName
                    );
                } else {
                    this._renderer.removeClass(
                        this.elem.nativeElement,
                        this.qpClassName
                    );
                }
            } else {
                this._renderer.removeClass(
                    this.elem.nativeElement,
                    this.qpClassName
                );
            }
    }
}
