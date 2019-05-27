import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkshopPageComponent } from "./workshop-page/workshop-page.component";
import { WorkshopsFeedComponent } from "./workshops-feed/workshops-feed.component";
import { WorkshopsResolver } from "../service/workshops/workshops.resolver";
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
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [WorkshopsResolver],
    exports: [RouterModule]
})
export class WorkshopsRoutingModule {}
