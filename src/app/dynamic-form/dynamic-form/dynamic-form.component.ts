import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "acp-dynamic-form",
    templateUrl: "./dynamic-form.component.pug",
    styleUrls: ["./dynamic-form.component.scss"]
})
export class DynamicFormComponent implements OnInit {
    @Input() config: Array<any> = [];
    @Output() submit: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    constructor(private FormBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this.createGroup();
    }
    createGroup(): FormGroup {
        const group = this.FormBuilder.group({});

        this.config.forEach(control => {
            if (control.name) {
                group.addControl(
                    control.name,
                    this.FormBuilder.control(
                        { value: control.initValue || "" },
                        [Validators.required]
                    )
                );
            }
        });

        return group;
    }
    onSubmit(form: FormGroup): void {
        if (form.valid) {
            this.submit.emit(form.value);
        }
    }
}
