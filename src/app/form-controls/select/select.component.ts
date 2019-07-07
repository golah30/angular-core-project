import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "acp-select",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectComponent,
            multi: true
        }
    ],
    templateUrl: "./select.component.pug",
    styleUrls: ["./select.component.scss"]
})
export class SelectComponent implements ControlValueAccessor {
    constructor() {}
    value: string;
    @Input() options;

    private propagateChange = (value: string) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    writeValue(value: string): void {
        console.log(this.options);

        this.value = value;
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
        this.propagateTouched = fn;
    }
    onChange(value: string) {
        this.propagateChange(value);
    }
}
