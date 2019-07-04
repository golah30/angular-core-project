import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Tag, Article } from "src/app/interfaces";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { selectTags, selectArticle } from "../store/workshops.selectors";
import { Location } from "@angular/common";
import { WorkshopsService } from "src/app/service/workshops/workshops.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ArticlePageRequest } from "../store/workshops.actions";

@Component({
    selector: "acp-workshops-create",
    templateUrl: "./workshops-create.component.pug",
    styleUrls: ["./workshops-create.component.scss"]
})
export class WorkshopsCreateComponent implements OnInit, OnDestroy {
    constructor(
        private store: Store<AppState>,
        private _location: Location,
        private WorkshopsService: WorkshopsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    form: FormGroup;
    tagsSub: Subscription;
    tags: Array<Tag>;
    articleSub: Subscription;
    created: boolean = false;
    ngOnInit() {
        if (this.route.snapshot.params.id) {
            this.store.dispatch(
                new ArticlePageRequest({ id: this.route.snapshot.params.id })
            );
            this.articleSub = this.store
                .select(selectArticle)
                .subscribe((data: Article) => {
                    if (data && data.id === this.route.snapshot.params.id) {
                        this.createEditForm(data);
                    }
                });
        } else {
            this.createForm();
        }
        this.tagsSub = this.store
            .select(selectTags)
            .subscribe((data: Array<Tag>) => {
                this.tags = data;
            });
    }
    ngOnDestroy() {
        this.tagsSub.unsubscribe();
        if (this.route.snapshot.params.id) {
            this.articleSub.unsubscribe();
        }
    }
    createEditForm(article: Article): void {
        this.form = new FormGroup({
            title: new FormControl(article.title, Validators.required),
            image: new FormControl(article.image || "", Validators.required),
            description: new FormControl(
                article.description || "",
                Validators.required
            ),
            text: new FormControl(article.text, Validators.required),
            tags: new FormControl(article.tags, Validators.required)
        });
        this.created = true;
    }
    createForm(): void {
        this.form = new FormGroup({
            title: new FormControl("", Validators.required),
            image: new FormControl("", Validators.required),
            description: new FormControl("", Validators.required),
            text: new FormControl("", Validators.required),
            tags: new FormControl([], Validators.required)
        });
        this.created = true;
    }
    onSubmit(): void {
        if (this.form.valid) {
            if (this.route.snapshot.params.id) {
                this.WorkshopsService.updatePost({
                    id: this.route.snapshot.params.id,
                    ...this.form.value
                }).subscribe((data: any) => {
                    this.router.navigate(["/workshops/" + data.post.id]);
                });
            } else {
                this.WorkshopsService.createPost({
                    ...this.form.value
                }).subscribe((data: any) => {
                    this.router.navigate(["/workshops/" + data.post.id]);
                });
            }
        }
    }
    onReject(): void {
        this._location.back();
    }
}
