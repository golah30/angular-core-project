import { Component, OnInit } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl
} from "@angular/forms";

@Component({
    selector: "acp-quizz-constructor",
    templateUrl: "./quizz-constructor.component.pug",
    styleUrls: ["./quizz-constructor.component.scss"]
})
export class QuizzConstructorComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    form: FormGroup;
    config = [];
    ngOnInit() {
        this.form = this.createGroup();
        this.form.valueChanges.subscribe(data => {
            console.log(data);
        });
    }
    get questionsArray() {
        return this.form.get("questions") as FormArray;
    }

    createGroup(): FormGroup {
        const group = this.fb.group({}, { updateOn: "blur" });

        group.addControl("name", this.fb.control("", [Validators.required]));

        group.addControl("questions", this.fb.array([]));

        return group;
    }
    addQuestion() {
        this.config.push([
            {
                type: "input",
                name: "question",
                label: "question"
            },
            {
                type: "select",
                name: "questionType",
                options: ["Short answer", "Choise"],
                label: "Question Type"
            },
            { type: "input", name: "correctAnswer", label: "Correct Answer" }
        ]);
        const group = this.fb.group({
            correctAnswer: new FormControl("", Validators.required),
            question: new FormControl("", Validators.required),
            questionType: new FormControl("", Validators.required)
        });
        this.questionsArray.push(group);
        group.get("questionType").valueChanges.subscribe(data => {
            console.log(11);
        });
    }
    removeQuestion(index: number) {}
    onSubmit() {
        console.log(222);
    }
}
