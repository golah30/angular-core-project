import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { TopPaneComponent } from "./top-pane/top-pane.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ConfirmPopupComponent } from "./confirm-popup/confirm-popup.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { ModalMessageComponent } from "./modal-message/modal-message.component";
@NgModule({
    declarations: [
        SideMenuComponent,
        TopPaneComponent,
        NotFoundComponent,
        ConfirmPopupComponent,
        ModalMessageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        SideMenuComponent,
        TopPaneComponent,
        ConfirmPopupComponent,
        ModalMessageComponent
    ],
    entryComponents: [ConfirmPopupComponent, ModalMessageComponent]
})
export class CoreModule {}
