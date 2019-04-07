import { FeaturesActionTypes, FeaturesActions } from "./features.actions";

export interface IFeaturesState {
    display: string,
    published?: any[],
    unpublished?: any[],
    detail?: any,
    filterMode?: boolean,
    selectedTags?: number[]
}

export const initialFeaturesState: IFeaturesState = {
    display: 'home',
    filterMode: true
};

export function featuresReducer(state: IFeaturesState = initialFeaturesState, action: FeaturesActions) {
    switch (action.type) {
        case FeaturesActionTypes.DISPLAY_HOME:
            return Object.assign({}, state, { display: 'home' });

        case FeaturesActionTypes.DISPLAY_DETAIL:
            return Object.assign({}, state, { display: 'detail' });

        case FeaturesActionTypes.FILTER_MODE_AND:
            console.log('FeaturesActionTypes.FILTER_MODE_AND', FeaturesActionTypes.FILTER_MODE_AND, Object.assign({}, state, { filterMode: true }))
            return Object.assign({}, state, { filterMode: true });

        case FeaturesActionTypes.FILTER_MODE_OR:
            console.log('FeaturesActionTypes.FILTER_MODE_OR', FeaturesActionTypes.FILTER_MODE_OR, Object.assign({}, state, { filterMode: false }))
            return Object.assign({}, state, { filterMode: false });

        case FeaturesActionTypes.FILTER_POSTS:
            console.log('FeaturesActionTypes.FILTER_POSTS', FeaturesActionTypes.FILTER_POSTS, Object.assign({}, state, { selectedTags: action.payload }))
            return Object.assign({}, state, { selectedTags: action.payload });

        default:
            return state
    }
}