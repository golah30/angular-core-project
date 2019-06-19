import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

interface opt {
    value: string;
}

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
    value: opt;
    @Input() options;

    private propagateChange = (value: opt) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    writeValue(value: opt): void {
        this.value = value;
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
        this.propagateTouched = fn;
    }
    onChange(value: opt) {
        this.propagateChange(value);
    }
}
