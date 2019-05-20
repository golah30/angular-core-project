import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { TopPaneComponent } from "./top-pane/top-pane.component";

@NgModule({
    declarations: [SideMenuComponent, TopPaneComponent],
    imports: [CommonModule],
    exports: [SideMenuComponent, TopPaneComponent]
})
export class CoreModule {}
