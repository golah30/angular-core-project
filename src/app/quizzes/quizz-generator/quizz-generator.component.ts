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
import { QuizzesRequest, QuizzPageRequest } from "../store/quizzes.actions";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { selectQuiz } from "../store/quizzes.selectors";

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
        private store: Store<AppState>,
        private route: ActivatedRoute
    ) {}
    form: FormGroup;
    options = [
        { value: "input", title: "Short answer" },
        { value: "select", title: "Choice" }
    ];
    quizId: string | null = null;
    loading: boolean = false;
    quizSub: Subscription;
    ngOnInit() {
        if (this.route.snapshot.params.id) {
            this.loading = true;
            this.store.dispatch(
                new QuizzPageRequest({ id: this.route.snapshot.params.id })
            );
            this.quizSub = this.store
                .select(selectQuiz)
                .subscribe((data: any) => {
                    if (data && data.id === this.route.snapshot.params.id) {
                        this.createFormFromConfig(data);
                        this.loading = false;
                        this.quizId = data.id;
                    }
                });
        } else {
            this.createForm();
        }
    }
    createForm() {
        this.form = new FormGroup({
            name: new FormControl("", Validators.required),
            questions: new FormArray([], Validators.required),
            posts: new FormControl([])
        });
    }
    createFormFromConfig(config: any) {
        this.form = new FormGroup({
            name: new FormControl(config.name, Validators.required),
            questions: new FormArray([], Validators.required),
            posts: new FormControl(config.posts)
        });
        config.questions.forEach((question, index) => {
            if (question.questionType === "input") {
                this.addQuestion(
                    question.correctAnswer,
                    question.question,
                    question.questionType
                );
            } else {
                let answerVariants = new FormArray([]);

                question.answerVariants.forEach(v => {
                    answerVariants.push(
                        this.fb.group({
                            isCorrect: [
                                v.isCorrect,
                                {
                                    validators: Validators.required,
                                    updateOn: "change"
                                }
                            ],
                            answer: [
                                v.answer,
                                {
                                    validators: Validators.required,
                                    updateOn: "blur"
                                }
                            ]
                        })
                    );
                });
                this.questions.push(
                    this.fb.group({
                        question: [
                            question.question,
                            {
                                validators: Validators.required,
                                updateOn: "blur"
                            }
                        ],
                        questionType: [
                            question.questionType,
                            {
                                validators: Validators.required,
                                updateOn: "change"
                            }
                        ],
                        answerVariants: answerVariants
                    })
                );
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
        });
    }
    addQuestion(
        correctAnswer: string = "",
        question: string = "",
        questionType: string = "input"
    ): void {
        this.questions.push(
            this.fb.group({
                correctAnswer: [
                    correctAnswer,
                    { validators: Validators.required, updateOn: "blur" }
                ],
                question: [
                    question,
                    { validators: Validators.required, updateOn: "blur" }
                ],
                questionType: [
                    questionType,
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
                if (this.quizId) {
                    this.QuizzesService.updateQuizz(
                        this.quizId,
                        this.form.value
                    ).subscribe((data: any) => {
                        this.store.dispatch(new QuizzesRequest({}));
                        this.modalService.modal({
                            type: "correct",
                            message: `Quiz "${this.form.value.name}" updated`
                        });
                    });
                } else {
                    this.QuizzesService.createQuizz(this.form.value).subscribe(
                        (data: any) => {
                            this.store.dispatch(new QuizzesRequest({}));
                            this.modalService.modal({
                                type: "correct",
                                message: `Quiz "${
                                    this.form.value.name
                                }" created`
                            });
                        }
                    );
                }
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
