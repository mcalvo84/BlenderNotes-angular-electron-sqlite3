import { Pipe, PipeTransform } from '@angular/core';

/*
 * Convert camelCase into snake-case.
 */
@Pipe({
    name: 'appFixUrl'
})
export class FixUrlPipe implements PipeTransform {
    transform(value: string): string {

        if (value.substring(0, 4).toLowerCase() === 'http') {
            return value;
        } else {
            return '//' + value;
        }
    }
}
