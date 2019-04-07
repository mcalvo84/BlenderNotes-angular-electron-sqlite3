import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { Subscription } from 'rxjs';
declare let electron: any;

// REDUX
import { Store, Action } from '@ngrx/store';
import { IFeaturesState } from 'src/app/features/features.reducer';
import { FilterPostsByTags } from 'src/app/features/features.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public ipc = electron.ipcRenderer;
  public categoryTypes: {}[] = [];
  public categoriesType = {};
  display = false;
  index = 0;

  getCategoryListSuscription: Subscription = new Subscription();
  postsGetAbaliableFilersForPostsSuscription: Subscription = new Subscription();

  constructor(
    private store: Store<{feature: IFeaturesState}>,
    public readonly _ipc: IpcService, 
    public ref: ChangeDetectorRef) {
      this.store.subscribe( state => {
        console.log("SIDEBAR >> ", JSON.stringify(state));
      })
  }

  ngOnInit() {
    this.getCategoryListSuscription = this._ipc.categoriesListEmitter.subscribe(result => {
      this.ref.detectChanges();
    })
    this.postsGetAbaliableFilersForPostsSuscription = this._ipc.postsGetAbaliableFilersForPostsEmitter.subscribe(result => {
      this.ref.detectChanges();
      //console.log(this._ipc.categoreisFileterdAvaliable)
    })
    this._ipc.send('catGetCategoriesList');
  }

  handleChange(e) {
    this.index = e.index;
    this.ref.detectChanges()
  }

  onClickCategory(item) {
    let selectedTags = this.getSelectedCategories();
    item.selected = !item.selected;
    this.ref.detectChanges();
    this._ipc.send('postsGetPosts', this.getSelectedCategories());
    this._ipc.send('postsGetAbaliableFilersForPosts', this.getSelectedCategories());
    //console.log(this._ipc.categoriesType)
    // REDUX
    console.log('REDUX :: FilterPostsByTags()', this.getSelectedCategories());
    let action = new FilterPostsByTags(this.getSelectedCategories());
    this.store.dispatch( action );
  }

  private getSelectedCategories() {
    let resultArray = [];
    Object.keys(this._ipc.categoriesType).forEach(key => {
      this._ipc.categoriesType[key].forEach(category => {
        if (category.selected) {
          resultArray.push(category.id)
        }
      });
    });
    return resultArray;
  }

}
