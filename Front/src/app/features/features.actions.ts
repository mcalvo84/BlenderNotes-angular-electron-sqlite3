import { Action } from "@ngrx/store";

export enum FeaturesActionTypes {
    DISPLAY_HOME = '[DISPLAY] HOME',
    DISPLAY_DETAIL = '[DISPLAY] DETAIL',
    FILTER_MODE_AND = '[FILTER_MODE] AND',
    FILTER_MODE_OR = '[FILTER_MODE] OR',
    FILTER_POSTS = '[FILTER_POSTS] TAGS'
}

export class DisplayHomeAction implements Action {
    readonly type = FeaturesActionTypes.DISPLAY_HOME;
}

export class DisplayPostsAction implements Action {
    readonly type = FeaturesActionTypes.DISPLAY_DETAIL;
}

export class FilterModeAndAction implements Action {
    readonly type = FeaturesActionTypes.FILTER_MODE_AND;
}

export class FilterModeOrAction implements Action {
    readonly type = FeaturesActionTypes.FILTER_MODE_OR;
}

export class FilterPostsByTags implements Action {
    readonly type = FeaturesActionTypes.FILTER_POSTS;

    constructor(public payload: Number[]) { }
}

export type FeaturesActions = DisplayHomeAction | DisplayPostsAction | FilterModeAndAction | FilterModeOrAction | FilterPostsByTags;