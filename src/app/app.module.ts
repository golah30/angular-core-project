import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

import { UserService } from "./service/user/user.service";
import { AuthGuardService } from "./guards/auth-guard.service";
import { ApiInterceptor } from "./interceptors/api.interceptor";
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule
    ],
    providers: [
        UserService,
        AuthGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
