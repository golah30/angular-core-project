import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input/input.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { SelectComponent } from "./select/select.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [InputComponent, CheckboxComponent, SelectComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, CheckboxComponent, SelectComponent]
})
export class FormControlsModule {}
