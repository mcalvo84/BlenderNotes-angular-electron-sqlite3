import { Injectable, EventEmitter } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { IPostExt } from '../models/posts';
import { StateService } from '../state.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    public ipcService: IpcService,
    public stateService: StateService
  ) {
    /* Get Notes */
    this.ipcService.on('[notes][result][fromPost]', (evt: Electron.IpcMessageEvent, result: IPostExt[]) => {
      this.stateService.data.detailPostNotes = result;
      this.stateService.emitChange('detailPost');
    });
  }

  public send(channel: string, ...args): void {
    this.ipcService.send(channel, ...args);
  }
}
