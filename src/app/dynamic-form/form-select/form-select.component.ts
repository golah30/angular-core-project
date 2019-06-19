import { Component, OnInit } from "@angular/core";
import { Field } from "src/app/interfaces";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "acp-form-select",
    templateUrl: "./form-select.component.pug",
    styleUrls: ["./form-select.component.scss"]
})
export class FormSelectComponent implements Field {
    group: FormGroup;
    config: any;
}
