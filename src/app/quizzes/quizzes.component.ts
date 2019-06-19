import { Component, OnInit, OnChanges } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

@Component({
    selector: "acp-quizzes",
    templateUrl: "./quizzes.component.pug",
    styleUrls: ["./quizzes.component.scss"]
})
export class QuizzesComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private FormBuilder: FormBuilder) {}
    states = [{ value: "first" }, { value: "second" }];
    ngOnInit() {
        this.formGroup = this.FormBuilder.group({
            somename: [""],
            check: [true],
            select: [this.states[1]]
        });
        this.onChanges();
    }
    onSubmit() {}
    onChanges() {
        this.formGroup.valueChanges.subscribe(value => {
            console.log(this.formGroup.value);
        });
    }
}
