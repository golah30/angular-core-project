import { Component, OnInit } from "@angular/core";
import { Field } from "src/app/interfaces";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "acp-form-input",
    templateUrl: "./form-input.component.pug",
    styleUrls: ["./form-input.component.scss"]
})
export class FormInputComponent implements Field {
    group: FormGroup;
    config: any;
}
