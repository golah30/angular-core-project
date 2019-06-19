import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "acp-dynamic-form",
    templateUrl: "./dynamic-form.component.pug",
    styleUrls: ["./dynamic-form.component.scss"]
})
export class DynamicFormComponent implements OnInit {
    @Input() config: Array<any> = [];
    @Output() handleSubmit: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    constructor(private FormBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this.createGroup();
    }
    createGroup(): FormGroup {
        const group = this.FormBuilder.group({}, { updateOn: "blur" });

        this.config.forEach(control => {
            if (control.name) {
                group.addControl(
                    control.name,
                    this.FormBuilder.control(control.initValue || "", [
                        Validators.required
                    ])
                );
            }
        });

        return group;
    }
    onSubmit(form: FormGroup): void {
        if (form.valid) {
            this.handleSubmit.emit(form.value);
        } else {
            console.log("Form invalid");
        }
    }
}
