import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormArray,
    FormControl,
    Validators
} from "@angular/forms";

@Component({
    selector: "acp-quiz-question",
    templateUrl: "./quiz-question.component.pug",
    styleUrls: ["./quiz-question.component.scss"]
})
export class QuizQuestionComponent implements OnInit {
    @Input() key: number;
    @Input() config: any;
    @Output() submit: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    get answerVariants() {
        return this.form.get("answerVariants") as FormArray;
    }

    options = [
        { value: "input", title: "Short answer" },
        { value: "select", title: "Choice" }
    ];
    constructor(private fb: FormBuilder) {}
    isShortAnswer: boolean;
    ngOnInit() {
        this.createGroup();
        this.isShortAnswer = this.config.questionType === "input";
        this.form.valueChanges.subscribe(data => {
            if (this.form.valid) {
                this.onSubmit(this.key, data);
            } else {
                console.log("invalid");
            }
        });
        this.form.get("questionType").valueChanges.subscribe(data => {
            this.isShortAnswer = data.value === "input";
            if (this.isShortAnswer) {
                this.formatFormToInput();
            } else {
                this.formatFormToSelect();
            }
        });
    }
    createGroup() {
        if (this.config.questionType === "input") {
            this.form = this.fb.group({
                question: new FormControl(this.config.question, {
                    validators: Validators.required,
                    updateOn: "blur"
                }),
                questionType: new FormControl(this.options[0], {
                    validators: Validators.required
                }),
                correctAnswer: new FormControl(
                    this.config.correctAnswer || "",
                    {
                        validators: Validators.required,
                        updateOn: "blur"
                    }
                )
            });
        } else {
            this.form = this.fb.group({
                question: new FormControl(this.config.question, {
                    validators: Validators.required,
                    updateOn: "blur"
                }),
                questionType: new FormControl(this.options[1], {
                    validators: Validators.required
                })
            });
            if (
                this.config.answerVariants &&
                this.config.answerVariants.length
            ) {
                this.form.addControl("answerVariants", new FormArray([]));
                this.config.answerVariants.forEach(element => {
                    this.answerVariants.push(
                        this.fb.group({
                            isCorrect: [
                                element.isCorrect,
                                {
                                    validators: Validators.required,
                                    updateOn: "change"
                                }
                            ],
                            answer: [
                                element.answer || "",
                                {
                                    validators: Validators.required,
                                    updateOn: "blur"
                                }
                            ]
                        })
                    );
                });
            } else {
                this.form.addControl(
                    "answerVariants",
                    new FormArray([
                        this.fb.group({
                            isCorrect: [
                                false,
                                {
                                    validators: Validators.required,
                                    updateOn: "change"
                                }
                            ],
                            answer: [
                                "",
                                {
                                    validators: Validators.required,
                                    updateOn: "blur"
                                }
                            ]
                        })
                    ])
                );
            }
        }
    }
    formatFormToInput() {
        this.form.removeControl("answerVariants");
        this.form.addControl(
            "correctAnswer",
            this.fb.control("", {
                validators: Validators.required,
                updateOn: "blur"
            })
        );
    }
    formatFormToSelect() {
        this.form.removeControl("correctAnswer");
        this.form.addControl(
            "answerVariants",
            this.fb.array([
                this.fb.group({
                    isCorrect: [
                        false,
                        {
                            validators: Validators.required,
                            updateOn: "change"
                        }
                    ],
                    answer: [
                        "",
                        {
                            validators: Validators.required,
                            updateOn: "blur"
                        }
                    ]
                }),
                this.fb.group({
                    isCorrect: [
                        false,
                        {
                            validators: Validators.required,
                            updateOn: "change"
                        }
                    ],
                    answer: [
                        "",
                        {
                            validators: Validators.required,
                            updateOn: "blur"
                        }
                    ]
                })
            ])
        );
    }
    addAnswer() {
        this.answerVariants.push(
            this.fb.group({
                isCorrect: [
                    false,
                    {
                        validators: Validators.required,
                        updateOn: "change"
                    }
                ],
                answer: [
                    "",
                    {
                        validators: Validators.required,
                        updateOn: "blur"
                    }
                ]
            })
        );
    }
    removeAnswer(id: number) {
        this.answerVariants.removeAt(id);
    }
    removeQuestion() {
        this.delete.emit(this.key);
    }
    onSubmit(key, data) {
        let value = data;
        value.questionType = data.questionType.value;
        this.submit.emit({ key: key, value: value });
    }
}
