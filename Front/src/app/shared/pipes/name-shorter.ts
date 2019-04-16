import { Pipe, PipeTransform } from '@angular/core';

/*
 *
 */
@Pipe({
    name: 'appNameShorter'
})
export class NameShorterPipe implements PipeTransform {
    transform(value: string, original = 'Blender', replace = 'B'): string {
        return value.split(original).join(replace);
    }
}
