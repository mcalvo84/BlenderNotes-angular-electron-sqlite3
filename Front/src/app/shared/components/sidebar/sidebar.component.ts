import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/core/api/posts.service';
import { TagsService } from 'src/app/core/api/tags.service';
import { StateService } from 'src/app/core/state.service';
declare let electron: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public openTagsCategory: boolean[] = [];
  private stateSuscription: Subscription = new Subscription();
  private stateItems = ['', 'sidebar'];

  getCategoryListSuscription: Subscription = new Subscription();
  postsGetAbaliableFilersForPostsSuscription: Subscription = new Subscription();

  constructor(
    public stateService: StateService,
    private postsService: PostsService,
    private tagsService: TagsService,
    public ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Detect state changes
    this.stateSuscription =
    this.stateService.changeEmitter.subscribe(element => {
      if (this.stateItems.indexOf(element)) {
        this.ref.detectChanges();
      }
    });

    // Load Tags
    this.tagsService.send('[tags][get][allTags]');
  }

  ngOnDestroy() {
    this.stateSuscription.unsubscribe();
  }

  handleChange(e) {
    this.ref.detectChanges();
  }

  onClickCategory(item) {
    item.selected = !item.selected;
    this.ref.detectChanges();
    this.postsService.send('[posts][get][list]', this.getSelectedCategories(), 1, 4);
    this.postsService.send('[posts][get][list]', this.getSelectedCategories(), 0, 4);
    this.tagsService.send('[tags][get][OR]', this.getSelectedCategories());
  }

  private getSelectedCategories() {
    let resultArray = [];
    Object.keys(this.stateService.data.tagsByCat).forEach(key => {
      this.stateService.data.tagsByCat[key].forEach(category => {
        if (category.selected) {
          resultArray.push(category.id);
        }
      });
    });
    return resultArray;
  }

}
