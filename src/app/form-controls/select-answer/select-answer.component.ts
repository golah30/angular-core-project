import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

interface opt {
    answer: string;
}

@Component({
    selector: "acp-select-answer",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectAnswerComponent,
            multi: true
        }
    ],
    templateUrl: "./select-answer.component.pug",
    styleUrls: ["./select-answer.component.scss"]
})
export class SelectAnswerComponent implements ControlValueAccessor {
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
