import {
    Component,
    AfterViewInit,
    Input,
    ElementRef,
    Renderer2
} from "@angular/core";
import { throttle } from "../../../helpers";

@Component({
    selector: "acp-to-top-button",
    templateUrl: "./to-top-button.component.pug",
    styleUrls: ["./to-top-button.component.scss"]
})
export class ToTopButtonComponent implements AfterViewInit {
    @Input() active: boolean;
    @Input() scrollEl: ElementRef;

    constructor(private _renderer: Renderer2) {}

    isScrolled: boolean = false;

    ngAfterViewInit() {
        const t: Function = throttle(e => {
            this.onScroll(e);
        }, 200);
        this._renderer.listen(this.scrollEl.nativeElement, "scroll", e => {
            t(e);
        });
    }

    onScroll = (event: any): void => {
        if (event.srcElement.scrollTop > 400 && !this.isScrolled) {
            this.isScrolled = true;
        } else if (event.srcElement.scrollTop < 400 && this.isScrolled) {
            this.isScrolled = false;
        }
    };

    onClick = (): void => {
        this.scrollEl.nativeElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };
}
