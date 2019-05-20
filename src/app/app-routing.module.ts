import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [];

// [
//   {
//       path: "",
//       redirectTo: "",
//       pathMatch: "full"
//   },
//   {
//       path: "asddas",
//       loadChildren: ""
//   }
// ]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
