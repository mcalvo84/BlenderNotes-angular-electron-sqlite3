import { Pipe, PipeTransform } from '@angular/core';

/*
 * Convert camelCase into snake-case.
 */
@Pipe({
    name: 'appCamelToSnake'
})
export class CamelToSnakePipe implements PipeTransform {
    transform(value: string, snake: string = '-'): string {
        let upperChars = value.match(/([A-Z])/g);
        if (!upperChars) {
            return value;
        }

        let str = value.toString();
        for (let i = 0, n = upperChars.length; i < n; i++) {
            str = str.replace(
                new RegExp(upperChars[i]),
                snake + upperChars[i].toLowerCase()
            );
        }

        if (str.slice(0, 1) === snake) {
            str = str.slice(1);
        }

        return str;
    }
}
