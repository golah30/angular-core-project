import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "acp-viewport",
    templateUrl: "./viewport.component.pug",
    styleUrls: ["./viewport.component.scss"]
})
export class ViewportComponent implements OnInit, OnDestroy {
    constructor() {}
    isSideContent: boolean = false;
    toggleSideContent(): void {
        this.isSideContent = !this.isSideContent;
    }
    isScrolled: boolean = false;
    scrollTop($element): void {
        $element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        this.isScrolled = false;
    }
    ngOnInit() {
        window.addEventListener("scroll", this.scroll, true);
    }
    ngOnDestroy() {
        window.removeEventListener("scroll", this.scroll, true);
    }
    scroll = (event: any): void => {
        if (event.srcElement.classList.contains("main__content")) {
            if (event.srcElement.scrollTop > 400 && !this.isScrolled) {
                this.isScrolled = true;
            } else if (event.srcElement.scrollTop < 400 && this.isScrolled) {
                this.isScrolled = false;
            }
        }
    };
}
