import { Component, OnInit } from "@angular/core";
import {
    ActivatedRoute,
    Router,
    RouterEvent,
    NavigationEnd
} from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
    selector: "acp-quizz-sidebar",
    templateUrl: "./quizz-sidebar.component.pug",
    styleUrls: ["./quizz-sidebar.component.scss"]
})
export class QuizzSidebarComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}
    isSideContent: boolean = false;
    link: string | null = "construct";
    toggleSideContent(): void {
        this.isSideContent = !this.isSideContent;
        if (this.link) {
            this.link = null;
        } else {
            this.link = "construct";
        }
    }
    ngOnInit() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: RouterEvent) => {
                if (event.url) {
                    if (
                        this.route.snapshot.firstChild &&
                        this.route.firstChild.children[0] &&
                        this.route.firstChild.children[0].routeConfig.path
                    ) {
                        this.link = null;
                        this.isSideContent = true;
                    } else {
                        this.link = "construct";
                    }
                }
            });
    }
}
