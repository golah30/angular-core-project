import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormInputComponent } from "./form-input/form-input.component";
import { FormSelectComponent } from "./form-select/form-select.component";
import { FormButtonComponent } from "./form-button/form-button.component";
import { DynamicFieldDirective } from "./dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormControlsModule } from "../form-controls/form-controls.module";
@NgModule({
    declarations: [
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
        DynamicFieldDirective,
        DynamicFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlsModule
    ],
    exports: [
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
        DynamicFieldDirective,
        DynamicFormComponent
    ]
})
export class DynamicFormModule {}
