import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ViewportComponent } from "./viewport/viewport.component";
import { CardComponent } from "./card/card.component";
import { TagComponent } from "./tag/tag.component";
import { UserPicComponent } from "./user-pic/user-pic.component";
import { TimestampComponent } from "./timestamp/timestamp.component";
import { ToTopButtonComponent } from "./to-top-button/to-top-button.component";
import { TabGroupComponent } from "./tab-group/tab-group.component";
import { TabComponent } from "./tab/tab.component";
import { CommentCardComponent } from "./comment-card/comment-card.component";
import { CommentFormComponent } from "./comment-form/comment-form.component";
import { LikeComponent } from "./like/like.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SvglogoComponent } from "./svglogo/svglogo.component";
import { ForRangeDirective } from "./directives/for-range.directive";
import { AcpCollapseComponent } from "./directives/collapse/acp-collapse/acp-collapse.component";

@NgModule({
    declarations: [
        UserPicComponent,
        TagComponent,
        LikeComponent,
        TimestampComponent,
        ToTopButtonComponent,
        CommentCardComponent,
        CardComponent,
        ViewportComponent,
        TabGroupComponent,
        TabComponent,
        CommentFormComponent,
        SvglogoComponent,
        ForRangeDirective,
        AcpCollapseComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [
        UserPicComponent,
        TagComponent,
        LikeComponent,
        TimestampComponent,
        ToTopButtonComponent,
        CommentCardComponent,
        CardComponent,
        ViewportComponent,
        TabGroupComponent,
        TabComponent,
        CommentFormComponent,
        SvglogoComponent,
        ForRangeDirective,
        AcpCollapseComponent
    ]
})
export class SharedModule {}
