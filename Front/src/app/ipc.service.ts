import { Injectable, EventEmitter } from '@angular/core';
// import { IpcRenderer } from 'electron';
declare let electron: any;

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  //private _ipc: IpcRenderer | undefined = void 0;
  public _ipc = electron.ipcRenderer;



/* SAVING POSTS */
public addSimplePostEmitter = new EventEmitter;
public addImageSimplePostEmitter = new EventEmitter;
public updatePostImageEmitter = new EventEmitter;


  constructor() {

    /* SAVING POSTS */
    this._ipc.on('addSimplePostResultSent', (evt: Electron.IpcMessageEvent, result) => {
      this.addSimplePostEmitter.emit(result);
    });
    this._ipc.on('addImageSimplePostResultSent', (evt: Electron.IpcMessageEvent, result) => {
      this.addImageSimplePostEmitter.emit(result);
    });
    this._ipc.on('updatePostImageResultSent', (evt: Electron.IpcMessageEvent, result) => {
      this.updatePostImageEmitter.emit(result);
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

}
