import { Directive, Renderer2, ElementRef, OnInit, Input } from "@angular/core";

@Directive({
    selector: "[acpHighlight]"
})
export class HighlightDirective implements OnInit {
    constructor(private _renderer: Renderer2, private elem: ElementRef) {}
    @Input() isHighlight: boolean = false;
    ngOnInit() {
        if (this.isHighlight) {
            this._renderer.setStyle(
                this.elem.nativeElement,
                "box-shadow",
                "0px 0px 8px 0px rgba(253, 208, 0, 0.7)"
            );
        }
    }
}
