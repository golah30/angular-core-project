import { Component, OnInit } from "@angular/core";
import {
    FormGroup,
    FormArray,
    FormControl,
    Validators,
    FormBuilder
} from "@angular/forms";
import { ModalMessageService } from "src/app/core/modal-message/modal-message.service";
import { QuizzesService } from "src/app/service/quizzes/quizzes.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { QuizzesRequest } from "../store/quizzes.actions";

@Component({
    selector: "acp-quizz-generator",
    templateUrl: "./quizz-generator.component.pug",
    styleUrls: ["./quizz-generator.component.scss"]
})
export class QuizzGeneratorComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private modalService: ModalMessageService,
        private QuizzesService: QuizzesService,
        private store: Store<AppState>
    ) {}
    form: FormGroup;
    options = [
        { value: "input", title: "Short answer" },
        { value: "select", title: "Choice" }
    ];
    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.form = new FormGroup({
            name: new FormControl("", Validators.required),
            questions: new FormArray([], Validators.required),
            posts: new FormControl([])
        });
    }
    addQuestion(): void {
        this.questions.push(
            this.fb.group({
                correctAnswer: [
                    "",
                    { validators: Validators.required, updateOn: "blur" }
                ],
                question: [
                    "",
                    { validators: Validators.required, updateOn: "blur" }
                ],
                questionType: [
                    "input",
                    { validators: Validators.required, updateOn: "change" }
                ]
            })
        );
        const index: number = this.questions.length - 1;
        this.questions
            .at(index)
            .get("questionType")
            .valueChanges.subscribe(data => {
                if (data === "input") {
                    this.formatQuestionToInput(index);
                } else {
                    this.formatQuestionToSelect(index);
                }
            });
    }
    addAnswer(qId: number) {
        const answerVariants: FormArray = this.questions
            .at(qId)
            .get("answerVariants") as FormArray;
        answerVariants.push(
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
    formatQuestionToInput(index: number): void {
        const question: FormGroup = this.questions.at(index) as FormGroup;
        question.removeControl("answerVariants");
        question.addControl(
            "correctAnswer",
            this.fb.control("", {
                validators: Validators.required,
                updateOn: "blur"
            })
        );
    }
    formatQuestionToSelect(index: number): void {
        const question: FormGroup = this.questions.at(index) as FormGroup;
        question.removeControl("correctAnswer");
        question.addControl(
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
    removeQuestion(id: number): void {
        this.questions.removeAt(id);
    }
    removeAnswer(qId: number, id: number): void {
        const answerVariants: FormArray = this.questions
            .at(qId)
            .get("answerVariants") as FormArray;
        answerVariants.removeAt(id);
    }
    get questions() {
        return this.form.get("questions") as FormArray;
    }
    onSubmit() {
        if (this.form.valid) {
            if (!this.checkAnswers()) {
                this.modalService.modal({
                    message:
                        "Questions with variants must have a field that checked as a correct variant"
                });
            } else {
                this.QuizzesService.createQuizz(this.form.value).subscribe(
                    (data: any) => {
                        this.store.dispatch(new QuizzesRequest({}));
                        this.modalService.modal({
                            type: "correct",
                            message: `Quiz "${this.form.value.name}" created`
                        });
                    }
                );
            }
        } else {
            if (!this.form.value.questions.length) {
                this.modalService.modal({
                    message: "To create a quiz add at least 1 question"
                });
            } else {
                this.modalService.modal({
                    message: "Text fields are required"
                });
            }
        }
    }
    checkAnswers(): boolean {
        const questions = this.form.value.questions
            .filter(q => q.questionType === "select")
            .map(q => q.answerVariants);
        let validAnswers = true;

        questions.forEach(variants => {
            let valid = false;
            variants.forEach(variant => {
                if (variant.isCorrect) {
                    valid = true;
                }
            });
            if (!valid) {
                validAnswers = false;
            }
        });
        return validAnswers;
    }
}
