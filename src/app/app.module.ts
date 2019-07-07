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
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./store/app.effects";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import { QuizzesService } from "./service/quizzes/quizzes.service";
import { AuthEffects } from "./auth/store/auth.effects";
import { WorkshopsEffects } from "./workshops/store/workshops.effects";
import { QuizzesEffects } from "./quizzes/store/quizzes.effects";
import { WorkshopsService } from "./service/workshops/workshops.service";
import { TagsService } from "./service/tags/tags.service";
import { CommentsService } from "./service/comments/comments.service";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        ScrollingModule,
        ExperimentalScrollingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([
            AppEffects,
            AuthEffects,
            WorkshopsEffects,
            QuizzesEffects
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        })
    ],
    providers: [
        UserService,
        QuizzesService,
        WorkshopsService,
        TagsService,
        CommentsService,
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
