import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "acp-like",
    templateUrl: "./like.component.pug",
    styleUrls: ["./like.component.scss"]
})
export class LikeComponent implements OnInit {
    @Input() isActive: boolean;
    @Input() count: number;
    @Output() onLikeToggle = new EventEmitter();
    constructor() {}
    onClick(): void {
        this.onLikeToggle.emit();
    }
    ngOnInit() {}
}
