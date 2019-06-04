import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

import { UserService } from "./service/user/user.service";
import { AuthGuardService } from "./guards/auth-guard.service";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule
    ],
    providers: [UserService, AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule {}
