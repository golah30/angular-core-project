import {
    Directive,
    ViewContainerRef,
    TemplateRef,
    Input,
    OnChanges
} from "@angular/core";

interface ForRangeContext {
    $implicit: any;
    originalKey: number;
}

@Directive({
    selector: "[acpForRange]"
})
export class ForRangeDirective implements OnChanges {
    @Input() acpForRangeOf: Array<object>;
    @Input() acpForRangeRange: Array<number> | number;

    ngOnChanges() {
        const range: Array<number> = this.toArray();
        const elems: Array<object> = this.acpForRangeOf;

        this.viewContainerRef.clear();
        let index = 0;
        for (let i = range[0]; i < range[1]; ++i) {
            this.viewContainerRef.createEmbeddedView(
                this.templateRef,
                {
                    $implicit: elems[i],
                    originalKey: i
                },
                index
            );
            index++;
        }
    }

    toArray(): Array<number> {
        if (typeof this.acpForRangeRange === "number") {
            return [0, this.acpForRangeRange];
        } else if (this.acpForRangeRange.length === 1) {
            return [0, this.acpForRangeRange[0]];
        } else {
            return this.acpForRangeRange;
        }
    }
    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<ForRangeContext>
    ) {}
}
