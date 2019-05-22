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

    ngAfterContentInit() {
        let activeTabs = this.tabs.filter(tab => tab.active);
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }
    selectTab(tab: TabComponent) {
        this.tabs.toArray().forEach(tab => (tab.active = false));
        tab.active = true;
    }
}
