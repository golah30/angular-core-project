import {
    Directive,
    Renderer2,
    ElementRef,
    OnInit,
    Input,
    OnChanges
} from "@angular/core";

@Directive({
    selector: "[acpTextToColor]"
})
export class TextToColorDirective implements OnInit, OnChanges {
    constructor(private _renderer: Renderer2, private elem: ElementRef) {}
    @Input() title: string;
    @Input() colorMap: Array<string> = [
        "#FFFFFF",
        "#fdd000",
        "#e3170a",
        "#2ab7ca",
        "#48a9a6",
        "#8ea604",
        "#03a9f4",
        "#f76f8e",
        "#df928e",
        "#259b24",
        "#8bc34a",
        "#afb42b",
        "#ff9800",
        "#ff5722",
        "#d6ce93",
        "#a9e5bb"
    ];
    @Input() darken: boolean = false;

    ngOnInit(): void {
        this._renderer.setStyle(
            this.elem.nativeElement,
            "background-color",
            this.toColor()
        );
        this._renderer.listen(this.elem.nativeElement, "mouseenter", e => {
            let lum = 0;
            if (this.darken) {
                lum = -0.2;
            } else {
                lum = 0.2;
            }
            this._renderer.removeStyle(
                this.elem.nativeElement,
                "background-color"
            );
            this._renderer.setStyle(
                this.elem.nativeElement,
                "background-color",
                this.shadeColor(this.toColor(), lum)
            );
        });
        this._renderer.listen(this.elem.nativeElement, "mouseleave", e => {
            this._renderer.removeStyle(
                this.elem.nativeElement,
                "background-color"
            );
            this._renderer.setStyle(
                this.elem.nativeElement,
                "background-color",
                this.toColor()
            );
        });
    }

    ngOnChanges(): void {
        this._renderer.setStyle(
            this.elem.nativeElement,
            "background-color",
            this.toColor()
        );
    }

    toColor(): string {
        let hash = 0;
        if (this.title.length === 0) return this.colorMap[hash];
        for (let i = 0; i < this.title.length; i++) {
            hash = this.title.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        hash =
            ((hash % this.colorMap.length) + this.colorMap.length) %
            this.colorMap.length;
        return this.colorMap[hash];
    }

    shadeColor(hex: string, lum: number): string {
        hex = String(hex).replace(/[^0-9a-f]/gi, "");
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        let rgb = "#",
            c,
            i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(
                16
            );
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    }
}
