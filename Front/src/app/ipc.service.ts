import { Injectable, EventEmitter } from '@angular/core';
// import { IpcRenderer } from 'electron';
declare let electron: any;

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  //private _ipc: IpcRenderer | undefined = void 0;
  public _ipc = electron.ipcRenderer;

  public categories = [];
  public categoriesListEmitter = new EventEmitter;
  public categoryTypes: {}[] = [];
  public categoriesType = {};
  public postsGetAbaliableFilersForPostsEmitter = new EventEmitter;
  public categoreisFileterdAvaliable: any[] = [];

    /* POSTS */
  public listOfPostsEmiter = new EventEmitter;
  public detailPostEmiter = new EventEmitter;


  constructor() {
    /* CATEGORIES */
    this._ipc.on('catGetCategoriesListResultSent', (evt: Electron.IpcMessageEvent, result) => {
      result.forEach(item => {
        if (!this.categoriesType[item.ttname]) {
          this.categoriesType[item.ttname] = [];
          this.categoryTypes.push({
            id: item.ttid,
            name: item.ttname,
            selected: false,
            disabled: false
          });
        }
        this.categoriesType[item.ttname].push({
          id: item.tid,
          name: item.tname,
          selected: false,
          disabled: false
        });

      });
      this.categoriesListEmitter.emit(result);
    });

    this._ipc.on('postsGetAbaliableFilersForPostsResultSent', (evt: Electron.IpcMessageEvent, result: any[]) => {
      this.categoreisFileterdAvaliable = result.map(item => item.tagID);
      Object.keys(this.categoriesType).forEach(key => {
        this.categoriesType[key].forEach(category => {
          category.disabled = !this.categoreisFileterdAvaliable.includes(category.id);
          /* if (this.categoreisFileterdAvaliable.includes(category.id)) {
            category.disabled = false;
          } else {
            category.disabled = true;
          } */
        });
      });
      // TODO
      if (this.categoreisFileterdAvaliable.length === 0) {
        let somethingSelected = false;
        Object.keys(this.categoriesType).forEach(key => {
          this.categoriesType[key].forEach(category => {
            if (category.selected) {
              somethingSelected = true;
            }
          });
        });
        Object.keys(this.categoriesType).forEach(key => {
          this.categoriesType[key].forEach(category => {
            if (!category.selected) {
              category.disabled = somethingSelected;
            } else {
              category.disabled = !somethingSelected;
            }
          });
        });
      }
      this.postsGetAbaliableFilersForPostsEmitter.emit(result);
    });

    /* POSTS */
    this._ipc.on('postsGetPostsResultSent', (evt: Electron.IpcMessageEvent, result: any[]) => {
      this.listOfPostsEmiter.emit(result);
    });

    this._ipc.on('postsGetPostByIdResultSent', (evt: Electron.IpcMessageEvent, result) => {
      this.detailPostEmiter.emit(result[0]);
    });

  }

  public on(channel: string, listener): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel, ...args);
  }

  public getPosts() {
  }

}
