import {
    Injectable,
    Injector,
    ComponentRef,
    InjectionToken
} from "@angular/core";
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";
import { PortalInjector, ComponentPortal } from "@angular/cdk/portal";
import { ConfirmPopupComponent } from "./confirm-popup.component";
import { ConfirmPopupOverlayRef } from "./confirm-popup-ref";
import { CONFIRM_POPUP_DATA } from "./confirm-popup.tokens";

export interface ConfirmPopupData {
    title: string | null;
    message?: string | null;
    cancelButton?: string | null;
    confirmationButton?: string | null;
    component?: any;
    componentToken?: InjectionToken<any>;
    componentData?: any;
}

export interface ConfirmPopupConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    data?: ConfirmPopupData;
}

const DEFAULT_CONFIRM_POPUP_CONFIG: ConfirmPopupConfig = {
    panelClass: "confirm-popup",
    hasBackdrop: true,
    backdropClass: "confirm-popup__backdrop",
    data: {
        title: "",
        message: "",
        cancelButton: "Cancel",
        confirmationButton: "Confirm"
    }
};
@Injectable({
    providedIn: "root"
})
export class ConfirmPopupService {
    constructor(private _injector: Injector, private _overlay: Overlay) {}

    private getConfirmPopupOverlayConfig(
        config: ConfirmPopupConfig
    ): OverlayConfig {
        const scrollStrategy = this._overlay.scrollStrategies.block();
        const positionStrategy = this._overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        return new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy,
            positionStrategy
        });
    }

    confirm(
        params
    ): Observable<boolean | { confirmed: boolean; payload: any }> {
        const confrimPopup = this.openConfirmPopup({ data: { ...params } });

        return confrimPopup.confirmed.pipe(
            take(1),
            filter(confirmed => !!confirmed)
        );
    }

    private createConfirmPopupOverlay(config: ConfirmPopupConfig) {
        const overlayConfig = this.getConfirmPopupOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }
    private createConfirmPopupInjector(
        config: ConfirmPopupConfig,
        confirmPopupRef: ConfirmPopupOverlayRef
    ): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(ConfirmPopupOverlayRef, confirmPopupRef);
        injectionTokens.set(CONFIRM_POPUP_DATA, config.data);

        return new PortalInjector(this._injector, injectionTokens);
    }
    private attachConfirmPopupContainer(
        overlayRef: OverlayRef,
        config: ConfirmPopupConfig,
        confirmPopupRef: ConfirmPopupOverlayRef
    ) {
        const injector = this.createConfirmPopupInjector(
            config,
            confirmPopupRef
        );
        const containerPortal = new ComponentPortal(
            ConfirmPopupComponent,
            null,
            injector
        );
        const containerRef: ComponentRef<
            ConfirmPopupComponent
        > = overlayRef.attach(containerPortal);

        containerRef.changeDetectorRef.detectChanges();

        return containerRef.instance;
    }
    openConfirmPopup(config: ConfirmPopupConfig = {}) {
        const confirmPopupConfig = {
            ...DEFAULT_CONFIRM_POPUP_CONFIG,
            ...config
        };
        const overlayRef = this.createConfirmPopupOverlay(confirmPopupConfig);
        const confirmPopupRef = new ConfirmPopupOverlayRef(overlayRef);

        confirmPopupConfig.data = {
            ...DEFAULT_CONFIRM_POPUP_CONFIG.data,
            ...(config.data ? config.data : {})
        };

        const componentInstance = this.attachConfirmPopupContainer(
            overlayRef,
            confirmPopupConfig,
            confirmPopupRef
        );

        confirmPopupRef.componentInstance = componentInstance;

        return componentInstance;
    }
}
