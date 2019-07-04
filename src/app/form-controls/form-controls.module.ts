import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input/input.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { SelectComponent } from "./select/select.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectTagsComponent } from "./select-tags/select-tags.component";
import { SharedModule } from "../shared/shared.module";
import { SelectAnswerComponent } from "./select-answer/select-answer.component";

@NgModule({
    declarations: [
        InputComponent,
        CheckboxComponent,
        SelectComponent,
        SelectTagsComponent,
        SelectAnswerComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
    exports: [
        InputComponent,
        CheckboxComponent,
        SelectComponent,
        SelectTagsComponent,
        SelectAnswerComponent
    ]
})
export class FormControlsModule {}
