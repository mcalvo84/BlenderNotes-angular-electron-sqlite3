import { NgModule } from '@angular/core';

// PIPEs
import { FileSizePipe } from './file-size.pipe';
import { DefaultImagePipe } from './default-image.pipe';
import { OrdinalPipe } from './ordinal.pipe';
import { TruncatePipe } from './truncate.pipe';
import { FilterPipe, SortByPipe } from './array.pipe';
import { CamelToSnakePipe } from './camel-to-snake';
import { FixUrlPipe } from './fix-url';
import { StripHtmlTagsPipe } from './strip-html-tags.pipe';
import { NameShorterPipe } from './name-shorter';

@NgModule({
    declarations: [
        FileSizePipe,
        DefaultImagePipe,
        OrdinalPipe,
        TruncatePipe,
        FilterPipe,
        SortByPipe,
        CamelToSnakePipe,
        FixUrlPipe,
        StripHtmlTagsPipe,
        NameShorterPipe
    ],
    exports: [
        FileSizePipe,
        DefaultImagePipe,
        OrdinalPipe,
        TruncatePipe,
        FilterPipe,
        SortByPipe,
        CamelToSnakePipe,
        FixUrlPipe,
        StripHtmlTagsPipe,
        NameShorterPipe
    ],
})
export class PipesModule {
}
