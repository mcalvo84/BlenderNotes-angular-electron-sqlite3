import { Injectable, EventEmitter } from '@angular/core';
// import { IpcRenderer } from 'electron';
declare let electron: any;

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  //private _ipc: IpcRenderer | undefined = void 0;
  public _ipc = electron.ipcRenderer;

  public listOfPostsEmiter = new EventEmitter;
  public detailPostEmiter = new EventEmitter;


  constructor() {
    this._ipc.on('postsGetPostsResultSent', (event: Electron.IpcMessageEvent, result: any[]) => {
      this.listOfPostsEmiter.emit(result);
    });

    this._ipc.on('postsGetPostByIdResultSent', (evt, result) => {
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
