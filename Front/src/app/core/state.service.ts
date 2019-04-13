import { Injectable, EventEmitter } from '@angular/core';
import { IPostExt } from './models/posts';

export interface IFeaturesState {
  display?: string;
  PostList?: IPostExt[];
  publishedPostList?: IPostExt[];
  unpublishedPostList?: IPostExt[];
  detailPost?: any;
  filterMode?: boolean;
  selectedTags?: number[];
  avaliableTags?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public data: IFeaturesState;
  public changeEmitter = new EventEmitter;

  constructor() {
    this.data = {};
    this.data.display = 'home';
    this.data.PostList = [];
    this.data.publishedPostList = [];
    this.data.unpublishedPostList = [];
    this.data.detailPost = null;
    this.data.filterMode = true;
    this.data.selectedTags = [];
    this.data.avaliableTags = [];
  }

  emitChange(stateItems) {
    console.log('emitChange()', stateItems);
    this.changeEmitter.emit(stateItems);
  }
}
