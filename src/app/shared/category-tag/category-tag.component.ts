import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "acp-category-tag",
    templateUrl: "./category-tag.component.pug",
    styleUrls: ["./category-tag.component.scss"]
})
export class CategoryTagComponent implements OnInit {
    constructor() {}
    @Input() ctg: string;
    @Output() onCtgSelect = new EventEmitter<string>();
    @Input() index: string;
    @Input() strong: boolean = false;

    ngOnInit() {}

    onCtgClick(): void {
        this.onCtgSelect.emit(this.index);
    }
}
