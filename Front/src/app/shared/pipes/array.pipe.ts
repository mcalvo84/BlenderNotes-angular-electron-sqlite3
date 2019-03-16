import { Pipe, PipeTransform } from '@angular/core';

/**
 * USAGE:
 * <tr *ngFor="let song of songs | appFilter : term | appSortBy: 'likes'">
 * songs = [
 *    {
 *      title: 'Song 1',
 *      likes: 25
 *    },
 *    {
 *      title: 'Song 5',
 *      likes: 50
 *    },
 *    {
 *      title: 'Song 10',
 *      likes: 10
 *    }
 *  ]
 */
@Pipe({
    name: 'appFilter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term): any {

        return term
            ? items.filter(item => item.title.indexOf(term) !== -1)
            : items;
    }
}

@Pipe({
    name: 'appSortBy'
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], sortedBy: string): any {
        return items.sort((a, b) => { return b[sortedBy] - a[sortedBy]; });
    }
}
