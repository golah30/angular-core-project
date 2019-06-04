import { Component, OnInit, ElementRef, Input, ViewChild } from "@angular/core";
import {
    AnimationBuilder,
    animate,
    style,
    AnimationPlayer
} from "@angular/animations";

@Component({
    selector: "[acpCollapse]",
    templateUrl: "./acp-collapse.component.pug",
    styleUrls: ["./acp-collapse.component.scss"]
})
export class AcpCollapseComponent implements OnInit {
    constructor(private el: ElementRef, private _builder: AnimationBuilder) {}

    @ViewChild("content") container: ElementRef;

    @Input() initialCollapse: boolean = true;
    @Input() height: string | number = 0;
    @Input() isCanCollapse: boolean = true;
    @Input() isAnimation: boolean = true;

    isCollapsed: boolean;
    title: string;
    player: AnimationPlayer;

    ngOnInit() {
        this.isCollapsed = this.initialCollapse;
        if (this.isCanCollapse) {
            this.definePlayers();
            this.player.play();
        }
    }

    definePlayers(): void {
        const animationDuration = this.isAnimation ? 300 : 0;
        const initialHeight = this.isCollapsed ? "*" : this.height;
        const animToHeight = this.isCollapsed ? this.height : "*";

        const animationMain = this._builder.build([
            style({ height: initialHeight }),
            animate(animationDuration, style({ height: animToHeight }))
        ]);

        this.player = animationMain.create(this.container.nativeElement);
        this.player.onDone(() => {
            this.toggleCollapseState();
        });
    }

    toggleCollapseState() {
        this.isCollapsed = !this.isCollapsed;
        this.title = this.isCollapsed ? "Show less" : "Show more";
    }

    onClick(): void {
        if (this.player) {
            this.player.destroy();
            this.definePlayers();
        }
        this.player.play();
    }
}
