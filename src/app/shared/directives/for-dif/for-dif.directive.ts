import {
    Directive,
    ViewContainerRef,
    TemplateRef,
    Input,
    OnChanges
} from "@angular/core";

interface ForDifContext {
    $implicit: any;
}

@Directive({
    selector: "[acpForDif]"
})
export class ForDifDirective implements OnChanges {
    @Input() acpForDifOf: Array<object>;
    @Input() acpForDifCmp: Array<number>;

    ngOnChanges() {
        const complement: Array<number> = this.acpForDifCmp;
        const elems: Array<any> = this.acpForDifOf;
        let sliced = elems.filter(
            e => complement.filter(c => c === e.seq).length === 0
        );
        this.viewContainerRef.clear();

        for (let i = 0; i < sliced.length; ++i) {
            this.viewContainerRef.createEmbeddedView(
                this.templateRef,
                {
                    $implicit: sliced[i]
                },
                i
            );
        }
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<ForDifContext>
    ) {}
}
