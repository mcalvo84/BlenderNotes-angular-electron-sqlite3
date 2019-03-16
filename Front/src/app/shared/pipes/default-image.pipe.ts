import { Pipe, PipeTransform } from '@angular/core';

/**
 * USAGE:
 * <img [src]="imageUrl | appDefaultImage:'http://url-to-img/128.jpg':true"/>
 */
@Pipe({
    name: 'appDefaultImage'
})
export class DefaultImagePipe implements PipeTransform {
    transform(
        value: string,
        fallback: string,
        forceHttps: boolean = false
    ): string {
        let image = '';
        if (value) {
            image = value;
        } else {
            image = fallback;
        }

        if (forceHttps) {
            if (image.indexOf('https') === -1) {
                image = image.replace('http', 'https');
            }
        }

        return image;
    }
}
