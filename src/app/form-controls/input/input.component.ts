import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "acp-input",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputComponent,
            multi: true
        }
    ],
    templateUrl: "./input.component.pug",
    styleUrls: ["./input.component.scss"]
})
export class InputComponent implements ControlValueAccessor {
    constructor() {}
    value: string;
    empty: boolean;
    @Input() type = "text";
    @Input() label = "";
    @Input() inputId = "";

    private propagateChange = (value: string) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    writeValue(value: string): void {
        this.value = value;
        this.empty = !!!this.value.length;
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
        this.propagateTouched = fn;
    }
    onFocus() {
        this.empty = false;
    }
    onChange(value: string) {
        this.propagateChange(value);
    }
    onBlur($event) {
        this.propagateTouched($event);
        this.empty = !!!this.value.length;
    }
}
