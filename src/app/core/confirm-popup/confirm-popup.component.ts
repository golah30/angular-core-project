import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    ChangeDetectorRef,
    Inject,
    OnDestroy,
    ChangeDetectionStrategy
} from "@angular/core";
import { Subscription } from "rxjs";
import { ConfirmPopupOverlayRef } from "./confirm-popup-ref";
import { ConfirmPopupData } from "./confirm-popup.service";
import { ESCAPE, ENTER } from "@angular/cdk/keycodes";
import {
    trigger,
    state,
    style,
    transition,
    animate
} from "@angular/animations";
import { CONFIRM_POPUP_DATA } from "./confirm-popup.tokens";

@Component({
    selector: "acp-confirm-popup",
    templateUrl: "./confirm-popup.component.pug",
    styleUrls: ["./confirm-popup.component.scss"],
    animations: [
        trigger("confirmPopup", [
            state(
                "void",
                style({
                    transform:
                        "scale(0.8) translate3d(0,150px,0) rotateX(-50deg)",
                    opacity: 0
                })
            ),
            state(
                "enter",
                style({
                    transform: "scale(1) translate3d(0,0,0) rotateX(0deg)",
                    opacity: 1
                })
            ),
            transition("void=>enter", animate("300ms")),
            state(
                "leave",
                style({
                    transform:
                        "scale(0.8) translate3d(0,150px,0) rotateX(-50deg)",
                    opacity: 0
                })
            ),
            transition("enter=>leave", animate("150ms"))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPopupComponent implements OnInit, OnDestroy {
    animationState: "void" | "enter" | "leave" = "enter";
    animationStateChanged = new EventEmitter<AnimationEvent>();
    keydowmEventsSubscription: Subscription;

    @Output() confirmed = new EventEmitter<
        boolean | { confirmed: boolean; payload: any }
    >();

    constructor(
        private _cdRef: ChangeDetectorRef,
        public confirmPopupRef: ConfirmPopupOverlayRef,
        @Inject(CONFIRM_POPUP_DATA) public data: ConfirmPopupData
    ) {}

    ngOnInit() {
        this.keydowmEventsSubscription = this.confirmPopupRef.keyDownEvents$.subscribe(
            keyCode => {
                switch (keyCode) {
                    case ESCAPE:
                        this.onCancel();
                        break;
                    case ENTER:
                        this.onConfirm();
                        break;
                }
            }
        );
    }
    ngOnDestroy() {
        if (this.keydowmEventsSubscription) {
            this.keydowmEventsSubscription.unsubscribe();
        }
    }
    onCancel() {
        this.confirmed.emit(false);
        this.confirmPopupRef.close();
    }
    onConfirm() {
        this.confirmed.emit(true);
        this.confirmPopupRef.close();
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
}
