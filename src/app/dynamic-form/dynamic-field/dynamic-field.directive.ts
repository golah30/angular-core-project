import {
    Directive,
    Input,
    ViewContainerRef,
    OnInit,
    OnChanges,
    Type,
    ComponentFactoryResolver,
    ComponentRef
} from "@angular/core";
import { Field } from "src/app/interfaces";
import { FormGroup } from "@angular/forms";
import { FormSelectComponent } from "../form-select/form-select.component";
import { FormInputComponent } from "../form-input/form-input.component";

const components: { [type: string]: Type<Field> } = {
    input: FormInputComponent,
    select: FormSelectComponent
};

@Directive({
    selector: "[acpDynamicField]"
})
export class DynamicFieldDirective implements Field, OnInit, OnChanges {
    @Input() config;
    @Input() group: FormGroup;

    component: ComponentRef<Field>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) {}

    ngOnInit() {
        if (!components[this.config.type]) {
            throw new Error("Trying to use an unsupported type");
        }

        const factory = this.resolver.resolveComponentFactory<Field>(
            components[this.config.type]
        );

        this.component = this.container.createComponent(factory, 0);

        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }
}
