import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkshopPageComponent } from "./workshop-page/workshop-page.component";
import { WorkshopsFeedComponent } from "./workshops-feed/workshops-feed.component";
import { WorkshopCommentsComponent } from "./workshop-comments/workshop-comments.component";
import { WorkshopQuizzesComponent } from "./workshop-quizzes/workshop-quizzes.component";
import { WorkshopsCreateComponent } from "./workshops-create/workshops-create.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "feed",
        pathMatch: "full"
    },
    {
        path: "feed",
        component: WorkshopsFeedComponent
    },
    {
        path: "create",
        pathMatch: "full",
        component: WorkshopsCreateComponent
    },
    {
        path: ":id/edit",
        pathMatch: "full",
        component: WorkshopsCreateComponent
    },
    {
        path: ":id",
        component: WorkshopPageComponent,
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
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})
export class WorkshopsRoutingModule {}
