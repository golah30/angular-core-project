import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { AuthGuardService } from "./guards/auth-guard.service";

const routes: Routes = [
    {
        path: "",
        redirectTo: "workshops",
        pathMatch: "full"
    },
    {
        path: "workshops",
        loadChildren: "./workshops/workshops.module#WorkshopsModule",
        canActivate: [AuthGuardService]
    },
    {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule"
    },
    {
        path: "quizzes",
        loadChildren: "./quizzes/quizzes.module#QuizzesModule"
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
