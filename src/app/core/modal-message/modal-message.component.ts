import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    ChangeDetectorRef,
    Inject,
    ChangeDetectionStrategy
} from "@angular/core";
import {
    trigger,
    state,
    style,
    transition,
    animate
} from "@angular/animations";
import { ModalData } from "./modal-message.service";
import { MODAL_MESSAGE_DATA } from "./modal-message.tokens";
import { ModalOverlayRef } from "./modal-message-ref";

@Component({
    selector: "acp-modal-message",
    templateUrl: "./modal-message.component.pug",
    styleUrls: ["./modal-message.component.scss"],
    animations: [
        trigger("modal", [
            state(
                "void",
                style({
                    opacity: 0
                })
            ),
            state(
                "enter",
                style({
                    opacity: 1
                })
            ),
            transition("void=>enter", animate("200ms")),
            state(
                "leave",
                style({
                    transform:
                        "scale(0.8) translate3d(0,150px,0) rotateX(-50deg)",
                    opacity: 0
                })
            ),
            transition("enter=>leave", animate("100ms"))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalMessageComponent implements OnInit {
    constructor(
        private _cdRef: ChangeDetectorRef,
        public modalRef: ModalOverlayRef,
        @Inject(MODAL_MESSAGE_DATA) public data: ModalData
    ) {}
    animationState: "void" | "enter" | "leave" = "enter";
    animationStateChanged = new EventEmitter<AnimationEvent>();
    ngOnInit() {
        this.delayedClose();
    }
    async delayedClose() {
        await this.delay(1500);
        this.modalRef.close();
    }
    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }
    startExitAnimation() {
        this.animationState = "leave";
        this._cdRef.detectChanges();
    }
    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
