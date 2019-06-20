import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { FormControlsModule } from "../form-controls/form-controls.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuizzPageComponent } from "./quizz-page/quizz-page.component";
import { QuizzFeedComponent } from "./quizz-feed/quizz-feed.component";
import { QuizzSidebarComponent } from "./quizz-sidebar/quizz-sidebar.component";
import { QuizzConstructorComponent } from "./quizz-constructor/quizz-constructor.component";
import { DynamicFormModule } from "../dynamic-form/dynamic-form.module";
import { QuizzesService } from "../service/quizzes/quizzes.service";
import { QuizzesResolver } from "../service/quizzes/quizzes.resolver";
import { QuizResolver } from "../service/quizzes/quiz.resolver";
import { QuizQuestionComponent } from './quizz-constructor/quiz-question/quiz-question.component';

@NgModule({
    declarations: [
        QuizzPageComponent,
        QuizzFeedComponent,
        QuizzSidebarComponent,
        QuizzConstructorComponent,
        QuizQuestionComponent
    ],
    providers: [QuizzesService, QuizResolver, QuizzesResolver],

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
