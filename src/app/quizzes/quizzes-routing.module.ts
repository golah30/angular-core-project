import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizzFeedComponent } from "./quizz-feed/quizz-feed.component";
import { QuizzPageComponent } from "./quizz-page/quizz-page.component";
import { QuizzConstructorComponent } from "./quizz-constructor/quizz-constructor.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "feed",
        pathMatch: "full"
    },
    {
        path: "feed",
        component: QuizzFeedComponent,
        children: [
            {
                path: "",
                outlet: "aside",
                children: [
                    {
                        path: "",
                        redirectTo: "construct",
                        pathMatch: "full"
                    },
                    {
                        path: "construct",
                        component: QuizzConstructorComponent
                    }
                ]
            }
        ]
    },
    {
        path: ":id",
        component: QuizzPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizzesRoutingModule {}
