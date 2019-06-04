import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizzesComponent } from "./quizzes.component";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { SharedModule } from "../shared/shared.module";
@NgModule({
    declarations: [QuizzesComponent],
    imports: [CommonModule, QuizzesRoutingModule, SharedModule]
})
export class QuizzesModule {}
