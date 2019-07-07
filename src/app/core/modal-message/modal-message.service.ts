import {
    Injectable,
    Injector,
    InjectionToken,
    ComponentRef
} from "@angular/core";
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ModalOverlayRef } from "./modal-message-ref";
import { ModalMessageComponent } from "./modal-message.component";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { MODAL_MESSAGE_DATA } from "./modal-message.tokens";

export interface ModalData {
    type?: "error" | "correct";
    message?: string | null;
    component?: any;
    componentToken?: InjectionToken<any>;
    componentData?: any;
}
export interface ModalConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    data?: ModalData;
}

const DEFAULT_MODAL_CONFIG: ModalConfig = {
    panelClass: "modal-message",
    hasBackdrop: false,
    backdropClass: "modal-message__backdrop",
    data: {
        type: "error",
        message: ""
    }
};

@Injectable({
    providedIn: "root"
})
export class ModalMessageService {
    constructor(private _injector: Injector, private _overlay: Overlay) {}

    private getModalOverlayConfig(config: ModalConfig): OverlayConfig {
        const scrollStrategy = this._overlay.scrollStrategies.block();
        const positionStrategy = this._overlay
            .position()
            .global()
            .right("20px")
            .top("100px");

        return new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy,
            positionStrategy
        });
    }
    modal(params): void {
        const modal = this.openModal({ data: { ...params } });
    }
    private createModalOverlay(config: ModalConfig) {
        const overlayConfig = this.getModalOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }
    private createModalInjector(
        config: ModalConfig,
        modalRef: ModalOverlayRef
    ): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(ModalOverlayRef, modalRef);
        injectionTokens.set(MODAL_MESSAGE_DATA, config.data);

        return new PortalInjector(this._injector, injectionTokens);
    }
    private attachModalContainer(
        overlayRef: OverlayRef,
        config: ModalConfig,
        modalRef: ModalOverlayRef
    ) {
        const injector = this.createModalInjector(config, modalRef);
        const containerPortal = new ComponentPortal(
            ModalMessageComponent,
            null,
            injector
        );
        const containerRef: ComponentRef<
            ModalMessageComponent
        > = overlayRef.attach(containerPortal);

        containerRef.changeDetectorRef.detectChanges();

        return containerRef.instance;
    }
    openModal(config: ModalConfig = {}) {
        const modalConfig = {
            ...DEFAULT_MODAL_CONFIG,
            ...config
        };
        const overlayRef = this.createModalOverlay(modalConfig);
        const modalRef = new ModalOverlayRef(overlayRef);

        modalConfig.data = {
            ...DEFAULT_MODAL_CONFIG.data,
            ...(config.data ? config.data : {})
        };

        const componentInstance = this.attachModalContainer(
            overlayRef,
            modalConfig,
            modalRef
        );

        modalRef.componentInstance = componentInstance;

        return componentInstance;
    }
}
