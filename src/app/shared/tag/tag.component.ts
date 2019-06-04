import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "acp-tag",
    templateUrl: "./tag.component.pug",
    styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
    @Input() tag: string;
    @Output() onTagSelect = new EventEmitter<string>();
    @Input() index: string;
    constructor() {}

    onTagClick(): void {
        this.onTagSelect.emit(this.tag);
    }
    ngOnInit() {}
}
