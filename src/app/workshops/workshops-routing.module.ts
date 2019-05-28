import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkshopPageComponent } from "./workshop-page/workshop-page.component";
import { WorkshopsFeedComponent } from "./workshops-feed/workshops-feed.component";
import { WorkshopsResolver } from "../service/workshops/workshops.resolver";
import { WorkshopCommentsComponent } from "./workshop-comments/workshop-comments.component";
import { WorkshopQuizzesComponent } from "./workshop-quizzes/workshop-quizzes.component";
import { WorkshopResourcesComponent } from "./workshop-resources/workshop-resources.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "feed",
        pathMatch: "full"
    },
    {
        path: "feed",
        component: WorkshopsFeedComponent,
        resolve: {
            workshops: WorkshopsResolver
        }
    },
    {
        path: ":id",
        component: WorkshopPageComponent,
        resolve: {
            article: WorkshopsResolver
        },
        children: [
            {
                path: "",
                outlet: "aside",
                children: [
                    {
                        path: "",
                        redirectTo: "comments",
                        pathMatch: "full"
                    },
                    {
                        path: "comments",
                        component: WorkshopCommentsComponent
                    },
                    {
                        path: "quizzes",
                        component: WorkshopQuizzesComponent
                    },
                    {
                        path: "resources",
                        component: WorkshopResourcesComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [WorkshopsResolver],
    exports: [RouterModule]
})
export class WorkshopsRoutingModule {}
