import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizzFeedComponent } from "./quizz-feed/quizz-feed.component";
import { QuizzPageComponent } from "./quizz-page/quizz-page.component";
import { QuizzConstructorComponent } from "./quizz-constructor/quizz-constructor.component";
import { QuizzesResolver } from "../service/quizzes/quizzes.resolver";
import { QuizResolver } from "../service/quizzes/quiz.resolver";

const routes: Routes = [
    {
        path: "",
        redirectTo: "feed",
        pathMatch: "full"
    },
    {
        path: "feed",
        component: QuizzFeedComponent,
        resolve: {
            quizzes: QuizzesResolver
        },
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
        component: QuizzPageComponent,
        resolve: {
            quiz: QuizResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizzesRoutingModule {}
