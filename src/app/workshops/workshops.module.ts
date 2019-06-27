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
import { WorkshopResourcesComponent } from "./workshop-resources/workshop-resources.component";
import { CommentsService } from "../service/comments/comments.service";
import { TagsService } from "../service/tags/tags.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { workshopsReducer } from "./store/workshops.reducer";
import { WorkshopsEffects } from "./store/workshops.effects";

@NgModule({
    declarations: [
        WorkshopPageComponent,
        WorkshopsFeedComponent,
        ArticleComponent,
        WorkshopSidebarComponent,
        WorkshopCommentsComponent,
        WorkshopQuizzesComponent,
        WorkshopResourcesComponent
    ],
    providers: [WorkshopsService, CommentsService, TagsService],
    imports: [
        CommonModule,
        WorkshopsRoutingModule,
        SharedModule,
        StoreModule.forFeature("workshops", workshopsReducer),
        EffectsModule.forFeature([WorkshopsEffects])
    ]
})
export class WorkshopsModule {}
