import { Component } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import {
    selectArticles,
    selectTotalArticlesCount
} from "src/app/workshops/store/workshops.selectors";
import { Article, User } from "src/app/interfaces";
import { ArticlesRequest } from "src/app/workshops/store/workshops.actions";
import { selectAuthUser } from "src/app/auth/store/auth.selectors";

@Component({
    selector: "acp-multiselect-workshops",
    templateUrl: "./multiselect-workshops.component.pug",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: MultiselectWorkshopsComponent,
            multi: true
        }
    ],
    styleUrls: ["./multiselect-workshops.component.scss"]
})
export class MultiselectWorkshopsComponent implements ControlValueAccessor {
    private propagateChange = (value: Array<string>) => {};
    private propagateTouched = ($event: FocusEvent) => {};
    value: Array<string>;
    articles: Array<Article>;
    isOpen: boolean = false;
    page: number = 0;
    maxPage: number = 0;
    userId: string = "";
    constructor(private store: Store<AppState>) {
        this.store.select(selectAuthUser).subscribe((data: User) => {
            this.userId = data._id;
        });
        this.store.select(selectArticles).subscribe((data: Array<Article>) => {
            this.articles = data;
        });
        this.store
            .select(selectTotalArticlesCount)
            .subscribe((data: number) => {
                this.maxPage = Math.ceil(data / 10) - 1;
            });
    }
    writeValue(value: Array<string>): void {
        this.value = value;
    }
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
        this.propagateTouched = fn;
    }
    onChange(value: string) {
        if (this.value.filter(id => id === value).length > 0) {
            this.value = this.value.filter(id => id !== value);
        } else {
            this.value = [...this.value, value];
        }
        this.propagateChange(this.value);
    }
    onPrevClick(): void {
        if (this.page) {
            this.page = this.page - 1;
            this.store.dispatch(
                new ArticlesRequest({ author: this.userId, page: this.page })
            );
        }
    }
    onNextClick(): void {
        if (this.page !== this.maxPage) {
            this.page = this.page + 1;
            this.store.dispatch(
                new ArticlesRequest({ author: this.userId, page: this.page })
            );
        }
    }
    onSelectorOpen(): void {
        this.store.dispatch(
            new ArticlesRequest({ author: this.userId, page: this.page })
        );
        this.isOpen = true;
    }
    onSelectorClose(): void {
        this.isOpen = false;
    }
}
