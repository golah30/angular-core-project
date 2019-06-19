import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class QuizzesService {
    private quizzes = [
        {
            id: "1",
            author: "Author name",
            date: new Date(),
            config: {
                name: "Quizz 1",
                questions: [
                    {
                        correctAnswer: "Angular",
                        question: "What is the best JS framework in 2019?",
                        questionType: "input"
                    },
                    {
                        correctAnswer: "Angular",
                        question: "What is the best JS framework in 2019?",
                        questionType: "input"
                    }
                ]
            }
        },
        {
            id: "2",
            author: "Author name 2",
            date: new Date(),
            config: {
                name: "Quizz Title 2.",
                questions: [
                    {
                        correctAnswer: "Angular",
                        question: "What is the best?",
                        questionType: "input"
                    },
                    {
                        correctAnswer: "Angular",
                        question: "How are you?",
                        questionType: "input"
                    }
                ]
            }
        }
    ];
    public getQuizzes(): Observable<any> {
        return of(this.quizzes);
    }
    public getQuizById(id: string): Observable<any> {
        let quiz = this.quizzes.filter(e => e.id === id)[0];
        if (quiz) {
            return of(quiz);
        } else {
            return of({ error: true });
        }
    }
    constructor() {}
}
