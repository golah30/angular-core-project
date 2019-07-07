import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { FormControlsModule } from "../form-controls/form-controls.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuizzPageComponent } from "./quizz-page/quizz-page.component";
import { QuizzFeedComponent } from "./quizz-feed/quizz-feed.component";
import { QuizzSidebarComponent } from "./quizz-sidebar/quizz-sidebar.component";
import { DynamicFormModule } from "../dynamic-form/dynamic-form.module";
import { QuizzesService } from "../service/quizzes/quizzes.service";
import { QuizzGeneratorComponent } from "./quizz-generator/quizz-generator.component";

@NgModule({
    declarations: [
        QuizzPageComponent,
        QuizzFeedComponent,
        QuizzSidebarComponent,
        QuizzGeneratorComponent
    ],
    providers: [QuizzesService],

    imports: [
        CommonModule,
        QuizzesRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule,
        DynamicFormModule
    ]
})
export class QuizzesModule {}
