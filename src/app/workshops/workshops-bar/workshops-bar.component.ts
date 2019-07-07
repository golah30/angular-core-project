import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Tag } from "src/app/interfaces";

@Component({
    selector: "acp-workshops-bar",
    templateUrl: "./workshops-bar.component.pug",
    styleUrls: ["./workshops-bar.component.scss"]
})
export class WorkshopsBarComponent implements OnInit {
    mainControlTitle: string = "Create workshop";
    routeMainControll: string = "/workshops/create";

    @Input() tags: Array<Tag> = [];
    @Input() categories: Array<Tag> = [];
    @Output() onCtgSelect = new EventEmitter<string>();
    @Output() onTgSelect = new EventEmitter<string>();

    isTags: boolean = false;
    isCategories: boolean = false;

    constructor() {}

    onCategorySelect(value: string): void {
        this.onCtgSelect.emit(value);
    }
    onTagSelect(value: string): void {
        this.onTgSelect.emit(value);
    }
    onTagsOpen(): void {
        this.isCategories = false;
        this.isTags = true;
    }
    onCategoriesOpen(): void {
        this.isTags = false;
        this.isCategories = true;
    }
    onContentBlur(): void {
        this.isCategories = false;
        this.isTags = false;
    }
    ngOnInit() {}
}
