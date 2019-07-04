import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Tag } from "src/app/interfaces";

@Component({
    selector: "acp-select-tags",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectTagsComponent,
            multi: true
        }
    ],
    templateUrl: "./select-tags.component.pug",
    styleUrls: ["./select-tags.component.scss"]
})
export class SelectTagsComponent implements ControlValueAccessor {
    constructor() {}
    value: Array<number> = [];
    active: boolean = false;
    selected: Array<Tag> = [];
    @Input() options: Array<Tag> = [];
    @Input() label: string = "";
    private propagateChange = (value: Array<number>) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    writeValue(value: Array<number>): void {
        this.value = value;
        this.selected = this.options.filter(
            e => value.filter(c => c === e.seq).length
        );
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
        this.propagateTouched = fn;
    }
    onAdd(id: number) {
        console.log(id);

        let tags = [...this.value];
        tags.push(id);
        this.value = tags;
        this.selected = this.options.filter(
            e => tags.filter(c => c === e.seq).length
        );
        this.propagateChange(tags);
    }
    onRemove(id: number) {
        console.log(id);
        let tags = [...this.value];
        tags = tags.filter(t => t !== id);
        this.value = tags;
        this.selected = this.options.filter(
            e => tags.filter(c => c === e.seq).length
        );
        this.propagateChange(tags);
    }
    onSelectOpen(): void {
        this.active = !this.active;
    }
    onSelectClose(): void {
        this.active = false;
    }
}
