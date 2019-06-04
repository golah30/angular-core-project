import { Component, OnInit, OnDestroy } from "@angular/core";
import { Tag, Article } from "../../interfaces";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "acp-workshops-feed",
    templateUrl: "./workshops-feed.component.pug",
    styleUrls: ["./workshops-feed.component.scss"]
})
export class WorkshopsFeedComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute, private router: Router) {}
    tags: Array<Tag>;
    categories: Array<Tag> = [
        { name: "All", isActive: false },
        { name: "Favorite", isActive: false },
        { name: "My Workshops", isActive: false }
    ];
    range: Array<number> | number;
    articles: Array<Article>;
    filteredActicles: Array<Article>;
    userid: string = "178";
    setQueryParams() {
        let activeTags: Array<number> = [];
        let activeCategories: Array<number> = [];

        this.tags.forEach((t, i) => {
            if (t.isActive) {
                activeTags.push(i);
            }
        });

        this.categories.forEach((t, i) => {
            if (t.isActive) {
                activeCategories.push(i);
            }
        });

        if (activeTags.length || activeCategories.length) {
            this.categories[0].isActive = false;
        } else {
            this.categories[0].isActive = true;
        }
        if (!activeTags.length && !activeCategories.length) {
            activeCategories.push(0);
        }
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                tags: activeTags.length ? activeTags.toString() : null,
                categories: activeCategories.length
                    ? activeCategories.toString()
                    : null
            },
            queryParamsHandling: "merge"
        });
    }
    onTagSelect(tag: string): void {
        this.tags.forEach(t => {
            if (t.name === tag) {
                t.isActive = !t.isActive;
            }
        });
        this.setQueryParams();
    }

    onCategorySelect(tag: string): void {
        if (tag === this.categories[0].name) {
            this.categories.forEach(t => {
                if (t.name !== this.categories[0].name) {
                    t.isActive = false;
                } else {
                    t.isActive = true;
                }
            });
            this.tags.forEach(t => {
                t.isActive = false;
            });
        } else {
            this.categories.forEach(t => {
                if (t.name === tag) {
                    t.isActive = !t.isActive;
                }
            });
            this.categories[0].isActive = false;
        }
        this.setQueryParams();
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.articles = data.workshops.articles;
            this.filteredActicles = data.workshops.articles;
            this.tags = data.workshops.tags;
            this.range = this.filteredActicles.length;
        });
        this.setQueryParams();
        this.route.queryParams.subscribe(params => {
            this.onParamsChange(params);
        });
    }
    ngOnDestroy() {
        this.tags.forEach(t => {
            t.isActive = false;
        });
        this.categories.forEach(t => {
            t.isActive = false;
        });
    }
    onParamsChange(params: Params) {
        let paramsTags: Array<number> | null = null;
        let paramsCtgs: Array<number> | null = null;
        if (params.tags) {
            paramsTags = JSON.parse(`[${params.tags}]`);
            paramsTags &&
                paramsTags.forEach(i => {
                    this.tags[i].isActive = true;
                });
        }
        if (params.categories) {
            paramsCtgs = JSON.parse(`[${params.categories}]`);
            paramsCtgs &&
                paramsCtgs.forEach(i => {
                    this.categories[i].isActive = true;
                });
        }
        if (
            (paramsTags && paramsTags.length) ||
            (paramsCtgs && paramsCtgs.length)
        ) {
            this.categories[0].isActive = false;
        } else {
            this.categories[0].isActive = true;
        }
        this.filterArticles(paramsTags, paramsCtgs);
    }

    filterArticles(
        tags: Array<number> | null,
        categories: Array<number> | null
    ) {
        let filteredArticles: Array<Article> = this.articles;
        if (categories) {
            let activeCtgNames: Array<String> = categories.map(ctgKey => {
                return this.categories[ctgKey].name;
            });
            if (activeCtgNames.filter(ctg => ctg === "Favorite").length) {
                filteredArticles = filteredArticles.filter(
                    article => article.isFavorite
                );
            }
            if (activeCtgNames.filter(ctg => ctg === "My Workshops").length) {
                filteredArticles = filteredArticles.filter(
                    article => article.author === this.userid
                );
            }
        }

        if (tags) {
            let activeTagNames: Array<String> = tags.map(tagKey => {
                return this.tags[tagKey].name;
            });
            filteredArticles = filteredArticles.filter(article => {
                return (
                    article.tags.filter(tag => {
                        return activeTagNames.filter(
                            activeTag => activeTag === tag
                        ).length;
                    }).length === activeTagNames.length
                );
            });
        }

        this.filteredActicles = filteredArticles;
        this.range = this.filteredActicles.length;
    }
}
