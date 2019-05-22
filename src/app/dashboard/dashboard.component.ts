import { Component, OnInit, OnDestroy } from "@angular/core";
interface Tag {
    name: string;
    isActive: boolean;
}
interface Comment {
    id: string;
    username: string;
    text: string;
}
@Component({
    selector: "acp-dashboard",
    templateUrl: "./dashboard.component.pug",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
    constructor() {}
    date: Date = new Date();
    comment: Comment = {
        id: "12",
        username: "Some user name",
        text: "Lorem ipsum dolore"
    };
    tag: Tag = {
        name: "some tag",
        isActive: true
    };
    isScrolled: boolean = false;
    isFavorite: boolean = false;
    onLikeToggle(): void {
        this.isFavorite = !this.isFavorite;
    }
    onTagSelect(tag: string): void {
        this.tag.isActive = !this.tag.isActive;
    }

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
    submit(comment: Comment) {
        console.log(comment);
        if (comment.id) {
            console.log("comment edited");
        } else {
            console.log("comment created");
        }
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
