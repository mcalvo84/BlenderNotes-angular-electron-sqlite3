import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/core/api/posts.service';
import { TagsService } from 'src/app/core/api/tags.service';
declare let electron: any;

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


  private stateSuscription: Subscription = new Subscription();
  private stateItems = ['', 'sidebar'];

  getCategoryListSuscription: Subscription = new Subscription();
  postsGetAbaliableFilersForPostsSuscription: Subscription = new Subscription();

  constructor(
    private postsService: PostsService,
    private tagsService: TagsService,
    public readonly _ipc: IpcService,
    public ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getCategoryListSuscription = this._ipc.categoriesListEmitter.subscribe(result => {
      this.ref.detectChanges();
    })
    this.postsGetAbaliableFilersForPostsSuscription = this._ipc.postsGetAbaliableFilersForPostsEmitter.subscribe(result => {
      this.ref.detectChanges();
      console.log(this._ipc.categoreisFileterdAvaliable)
    })
    this._ipc.send('catGetCategoriesList');
    this.tagsService.send('[tags][get][allTags]');
  }

  handleChange(e) {
    this.index = e.index;
    this.ref.detectChanges()
  }

  onClickCategory(item) {
    item.selected = !item.selected;
    this.ref.detectChanges();
    this.postsService.send('[posts][get][list]', this.getSelectedCategories(), 1, 4);
    this.postsService.send('[posts][get][list]', this.getSelectedCategories(), 0, 4);
    this._ipc.send('postsGetAbaliableFilersForPosts', this.getSelectedCategories());
    this.postsService.send('[tags][get][sharedTags]', this.getSelectedCategories());
    console.log(this._ipc.categoriesType)
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
