import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "contains"
})
export class ContainsPipe implements PipeTransform {
    transform(value: [string, Array<string>]): boolean {
        const id: string = value[0];
        const array: Array<string> = value[1];

        return array.filter(i => i === id).length > 0;
    }
}
