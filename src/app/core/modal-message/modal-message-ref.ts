import { Subject, Observable } from "rxjs";
import { OverlayRef } from "@angular/cdk/overlay";
import { filter, take } from "rxjs/operators";
import { ModalMessageComponent } from "./modal-message.component";

export class ModalOverlayRef {
    private _beforeClose = new Subject<void>();
    private _afterClosed = new Subject<void>();

    componentInstance: ModalMessageComponent;

    get overlayRef(): OverlayRef {
        return this._overlayRef;
    }

    constructor(private _overlayRef: OverlayRef) {}

    close(): void {
        this.componentInstance.animationStateChanged
            .pipe(
                filter((event: any) => event.phaseName === "start"),
                take(1)
            )
            .subscribe(() => {
                this._beforeClose.next();
                this._beforeClose.complete();
                this.overlayRef.detachBackdrop();
            });

        this.componentInstance.animationStateChanged
            .pipe(
                filter(
                    (event: any) =>
                        event.phaseName === "done" && event.toState === "leave"
                ),
                take(1)
            )
            .subscribe(() => {
                this.overlayRef.dispose();
                this._afterClosed.next();
                this._afterClosed.complete();
                this.componentInstance = null;
            });

        this.componentInstance.startExitAnimation();
    }
    afterClosed(): Observable<void> {
        return this._afterClosed.asObservable();
    }
    beforeClosed(): Observable<void> {
        return this._beforeClose.asObservable();
    }
}
