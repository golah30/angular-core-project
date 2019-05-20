import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule"
    },
    {
        path: "quizzes",
        loadChildren: "./quizzes/quizzes.module#QuizzesModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
