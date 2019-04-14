import { Injectable, EventEmitter } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { IPostExt } from '../models/posts';
import { StateService } from '../state.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {


  public categories = [];
  public categoryTypes: {}[] = [];
  public categoriesType = {};
  public mainCategories: boolean[] = [];
  public categoreisFileterdAvaliable: any[] = [];

  constructor(
    public ipcService: IpcService,
    public stateService: StateService
  ) {

    /**
     * Get list of all tags
     */
    this.ipcService.on('[tags][result][allTags]', (evt: Electron.IpcMessageEvent, result) => {
      result.forEach((item, i) => {
        this.mainCategories.push((i == 0));
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
      this.stateService.data.allTags = result;
      this.stateService.emitChange('sidebar');
    });

    /**
     * Get avaliable tags once any of them is selected
     */
    this.ipcService.on('[tags][result][sharedtags]', (evt: Electron.IpcMessageEvent, result: any[]) => {
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
      this.stateService.data.avaliableTags = result;
      this.stateService.emitChange('sidebar');
    });
  }

  public send(channel: string, ...args): void {
    this.ipcService.send(channel, ...args);
  }
}
