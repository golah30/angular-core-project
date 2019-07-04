import { Component, OnInit } from "@angular/core";
import _ from "lodash";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuizzesService } from "src/app/service/quizzes/quizzes.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { QuizzesRequest } from "../store/quizzes.actions";

@Component({
    selector: "acp-quizz-constructor",
    templateUrl: "./quizz-constructor.component.pug",
    styleUrls: ["./quizz-constructor.component.scss"]
})
export class QuizzConstructorComponent implements OnInit {
    constructor(
        private QuizzesService: QuizzesService,
        private store: Store<AppState>
    ) {}
    form: FormGroup;
    defaultQuestionConfig = {
        correctAnswer: "",
        question: "",
        questionType: "input"
    };
    config = [];
    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl("", Validators.required)
        });
    }

    addQuestion() {
        this.config.push(this.defaultQuestionConfig);
    }
    handleQuestionChange(payload: { key: number; value: any }) {
        let config = _.cloneDeep(this.config);
        config[payload.key] = payload.value;
        this.config = config;
    }
    removeQuestion(index: number) {
        this.config = this.config.filter((c, i) => i !== index);
    }
    onSubmit() {
        let validCfg = this.validateConfig();
        console.log(validCfg);

        if (this.form.valid && validCfg) {
            console.log({ name: this.form.value.name, questions: this.config });
            this.QuizzesService.createQuizz({
                name: this.form.value.name,
                questions: this.config
            }).subscribe((data: any) => {
                this.store.dispatch(new QuizzesRequest({}));
                alert("Submitted");
            });
        } else {
            console.warn(
                "Enter the name of the quiz or add at least one question"
            );
        }
    }
    validateConfig(): boolean {
        let valid = true;
        const config = this.config;
        console.log(config);
        if (!config.length) {
            valid = false;
        }
        config.forEach(cfg => {
            if (cfg.question === "") {
                console.warn('Some question without "question"');
                valid = false;
            }
            if (cfg.questionType === "input" && cfg.correctAnswer === "") {
                console.warn(
                    'Some question with "short answer" without "correctAnswer"'
                );
                valid = false;
            }
            if (cfg.questionType !== "input") {
                let isCorrectCheck = false;
                cfg.answerVariants.forEach(vars => {
                    if (vars.isCorrect) {
                        isCorrectCheck = true;
                    }
                    if (vars.answer === "") {
                        console.warn("Set values into all variants fields");
                        valid = false;
                    }
                });
                if (!isCorrectCheck) {
                    console.warn("Set at least one variant filed as correct");
                    valid = false;
                }
            }
        });

        return valid;
    }
}
