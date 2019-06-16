import { Injectable, EventEmitter } from '@angular/core';
import { IPostExt } from './models/posts';

export interface IFeaturesState {
  display?: string;
  PostList?: IPostExt[];
  publishedPostList?: IPostExt[];
  unpublishedPostList?: IPostExt[];
  detailPost?: IPostExt;
  detailPostTags?: any;
  detailPostNotes?: any[];
  filterMode?: boolean;
  selectedTags?: number[];
  avaliableTags?: number[];
  tagTypes?: any;
  tagsByCat?: any;
  currentBlogroll?: any;
  editMode?: boolean;
  filesPost?: any;
  videosPost?: any;
  videosPostIframe?: any;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public data: IFeaturesState;
  public changeEmitter = new EventEmitter;

  constructor() {
    this.data = {};

    // Layout
    this.data.display = 'home';
    this.data.filterMode = true;

    // Post lists
    this.data.PostList = [];
    this.data.publishedPostList = [];
    this.data.unpublishedPostList = [];

    // Post detail
    this.data.detailPost = null;
    this.data.detailPostTags = {};
    this.data.detailPostNotes = [];
    this.data.editMode = false;
    this.data.filesPost = null;
    this.data.videosPost = [];
    this.data.videosPostIframe = [];

    // Tags
    this.data.selectedTags = [];
    this.data.avaliableTags = [];
    this.data.tagTypes = [];
    this.data.tagsByCat = {};

    // Blogroll
    this.data.currentBlogroll = '';
  }

  emitChange(stateItems) {
    console.log('emitChange()', stateItems);
    this.changeEmitter.emit(stateItems);
  }
}
