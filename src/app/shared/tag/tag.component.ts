import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "acp-tag",
    templateUrl: "./tag.component.pug",
    styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
    @Input() tag: string;
    @Input() isActive: boolean;
    @Output() onTagSelect = new EventEmitter<string>();

    constructor() {}

    onTagClick(): void {
        this.onTagSelect.emit(this.tag);
    }
    ngOnInit() {}
}
