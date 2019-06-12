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
    providers: [WorkshopsService],
    imports: [CommonModule, WorkshopsRoutingModule, SharedModule]
})
export class WorkshopsModule {}
