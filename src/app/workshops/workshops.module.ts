import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkshopPageComponent } from "./workshop-page/workshop-page.component";
import { WorkshopsFeedComponent } from "./workshops-feed/workshops-feed.component";
import { ArticleComponent } from "./article/article.component";
import { WorkshopsRoutingModule } from "./workshops-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WorkshopsService } from "../service/workshops/workshops.service";
import { WorkshopSidebarComponent } from "./workshop-sidebar/workshop-sidebar.component";
import { WorkshopCommentsComponent } from "./workshop-comments/workshop-comments.component";
import { WorkshopQuizzesComponent } from "./workshop-quizzes/workshop-quizzes.component";
import { CommentsService } from "../service/comments/comments.service";
import { TagsService } from "../service/tags/tags.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { workshopsReducer } from "./store/workshops.reducer";
import { WorkshopsEffects } from "./store/workshops.effects";
import { WorkshopsCreateComponent } from "./workshops-create/workshops-create.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormControlsModule } from "../form-controls/form-controls.module";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import { QuizzesService } from "../service/quizzes/quizzes.service";
@NgModule({
    declarations: [
        WorkshopPageComponent,
        WorkshopsFeedComponent,
        ArticleComponent,
        WorkshopSidebarComponent,
        WorkshopCommentsComponent,
        WorkshopQuizzesComponent,
        WorkshopsCreateComponent
    ],
    providers: [WorkshopsService, CommentsService, QuizzesService, TagsService],
    imports: [
        CommonModule,
        WorkshopsRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule,
        StoreModule.forFeature("workshops", workshopsReducer),
        EffectsModule.forFeature([WorkshopsEffects]),
        ScrollingModule,
        ExperimentalScrollingModule
    ]
})
export class WorkshopsModule {}
