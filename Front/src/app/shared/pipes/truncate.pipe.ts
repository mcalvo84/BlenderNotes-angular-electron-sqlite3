import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'appTruncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: string): string {
        return value.length > +limit ? value.substring(0, +limit) + '...' : value;
    }
}
