import {
    Component,
    AfterContentInit,
    ContentChildren,
    QueryList
} from "@angular/core";
import { TabComponent } from "../tab/tab.component";

@Component({
    selector: "acp-tab-group",
    templateUrl: "./tab-group.component.pug",
    styleUrls: ["./tab-group.component.scss"]
})
export class TabGroupComponent implements AfterContentInit {
    constructor() {}

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    ngAfterContentInit() {}
}
