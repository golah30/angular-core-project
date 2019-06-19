import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizzesComponent } from "./quizzes.component";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { FormControlsModule } from "../form-controls/form-controls.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [QuizzesComponent],
    imports: [
        CommonModule,
        QuizzesRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
    ]
})
export class QuizzesModule {}
