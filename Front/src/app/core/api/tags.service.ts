import { Injectable, EventEmitter } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { IPostExt } from '../models/posts';
import { StateService } from '../state.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {


  public categoreisFileterdAvaliable: any[] = [];

  constructor(
    public ipcService: IpcService,
    public stateService: StateService
  ) {

    /**
     * Get list of all tags
     */
    this.ipcService.on('[tags][result][allTags]', (evt: Electron.IpcMessageEvent, result) => {
      this.stateService.data.tagsByCat = {};
      this.stateService.data.tagTypes = [];
      this.stateService.data.selectedTags = [];
      this.stateService.data.avaliableTags = [];

      result.forEach((item, i) => {
        if (!this.stateService.data.tagsByCat[item.ttname]) {
          this.stateService.data.tagsByCat[item.ttname] = [];
          this.stateService.data.tagTypes.push({
            id: item.ttid, name: item.ttname, selected: false, disabled: false
          });
        }
        this.stateService.data.tagsByCat[item.ttname].push({
          id: item.tid, name: item.tname, selected: false, disabled: false
        });
      });

      this.stateService.emitChange('sidebar');
    });

    /**
     * Get avaliable tags once any of them is selected
     */
    this.ipcService.on('[tags][result][OR]', (evt: Electron.IpcMessageEvent, result: any[]) => {
      this.stateService.data.avaliableTags = result.map(item => item.tagID);
      Object.keys(this.stateService.data.tagsByCat).forEach(key => {
        this.stateService.data.tagsByCat[key].forEach(category => {
          category.disabled = !this.stateService.data.avaliableTags.includes(category.id);
          /* if (this.stateService.data.avaliableTags.includes(category.id)) {
            category.disabled = false;
          } else { category.disabled = true; } */
        });
      });
      if (this.stateService.data.avaliableTags.length === 0) {
        let somethingSelected = false;
        Object.keys(this.stateService.data.tagsByCat).forEach(key => {
          this.stateService.data.tagsByCat[key].forEach(category => {
            if (category.selected) { somethingSelected = true; }
          });
        });
        Object.keys(this.stateService.data.tagsByCat).forEach(key => {
          this.stateService.data.tagsByCat[key].forEach(category => {
            if (!category.selected) {
              category.disabled = somethingSelected;
            } else { category.disabled = !somethingSelected; }
          });
        });
      }

      this.stateService.emitChange('sidebar');
    });
  }

  public send(channel: string, ...args): void {
    this.ipcService.send(channel, ...args);
  }
}
