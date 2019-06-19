import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "acp-checkbox",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CheckboxComponent,
            multi: true
        }
    ],
    templateUrl: "./checkbox.component.pug",
    styleUrls: ["./checkbox.component.scss"]
})
export class CheckboxComponent implements ControlValueAccessor {
    constructor() {}

    @Input() value: boolean;
    @Input() label: string = "";

    private propagateChange = (value: boolean) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    writeValue(value: boolean): void {
        this.value = value;
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
        this.propagateTouched = fn;
    }
    onChange(value: boolean) {
        this.propagateChange(value);
    }
}
