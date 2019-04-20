import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { StateService } from 'src/app/core/state.service';
import { PostsService } from 'src/app/core/api/posts.service';
import { NotesService } from 'src/app/core/api/notes.service';
import { TagsService } from 'src/app/core/api/tags.service';
import { IPost } from 'src/app/core/models/posts';
declare let electron: any;

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPostComponent implements OnInit, OnDestroy {

  // State
  private stateSuscription: Subscription = new Subscription();
  private stateItems = ['', 'detailPost'];
  id = 0;
  formReady = false;

  // Breadcrumb
  items: MenuItem[];
  home: MenuItem;

  // Form
  form: FormGroup;
  formChangesSubscription: Subscription;
  // openTagsCategory: boolean[] = [];
  publishedOptions = [
    {label: 'Borrador', value: 0, icon: 'fa fa-fw fa-square'},
    {label: 'Publicado', value: 1, icon: 'fa fa-fw fa-check-square'},
  ];
  tagMultiselectValues = {};

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private tagsService: TagsService,
    private notesService: NotesService,
    public stateService: StateService,
    public ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    // Layout settings
    this.stateService.data.display = 'detail';
    this.stateService.emitChange('display');

    // Form
    this.buildForm();
    this.changeForm();

    // Detect state changes
    this.stateSuscription =
    this.stateService.changeEmitter.subscribe((element) => {
      if (this.stateItems.indexOf(element)) {
        this.initForm();
        this.buildBreadcrumbs();
        this.ref.detectChanges();
      }
    });

    // Get detail of post or create new one
    this.id = this.route.snapshot.params.id;
    if (this.id > 0) {
      this.postsService.send('[posts][get][byID]', this.id);
      this.tagsService.send('[tags][get][fromPost]', this.id);
      this.notesService.send('[notes][get][fromPost]', this.id);
    } else {
      this.ref.detectChanges();
    }
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.stateSuscription.unsubscribe();
    this.formChangesSubscription.unsubscribe();
  }

  // ngOnChanges() {
  // }

  /**
   * On SUBMIT FORM
   */
  onSubmit() {
      // let body = new RejectInitiativeBODY(this.form.value);

      // body.setActionID(this.data.actionID)
      //     .setInitiativeID(this.data.initiativeID)
      //     .setRejectionDate(Utils.dateToString(this.form.get('rejectionDate').value));

      // if (this.uploads.private) {
      //     body.setFilePrivate(this.uploads.private);
      // }
      // if (this.uploads.public) {
      //     body.setFilePublic(this.uploads.public);
      // }

      // this.uxService.blockDocument();
      // this.formSubmitSubscription = this.homeApiService.rejectRegistrationWithBody(body).subscribe(
      //     data => {
      //         this.uxService.unblockDocument();
      //         this.error.successMsg$.next(data.message);
      //         this.homeService.listUpdate.emit(this.homeService.getTableData());
      //         this.onCancel();
      //     },
      //     () => this.uxService.unblockDocument()
      // );
  }

  /**
   * On CANCEL FORM
   */
  onCancel() {
      // this.data.onCloseModal(this.data.parent.portalHostRef, this.data.parent.portalRef);
  }

  consolelog(log) {
    console.log(log)
  }

  /**
   * FORM creation
   */
  private buildForm() {

    let tagFormGroups = {};

    this.stateService.data.tagTypes.forEach(element => {
      tagFormGroups[element.name] = new FormControl();
      this.tagMultiselectValues[element.name] =
      this.stateService.data.tagsByCat[element.name].map(item => {
        return { label: item.name, value: item.id };
      });
    });

    this.form = this.fb.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required],
      'published': [false],
      'createAt': [null],
      'updatedAt': [null],
      'BlogrollId': [null],
      'ImageId': [null],
      'UserId': [null],
      'original': [null],
      'tags': this.fb.group(tagFormGroups)
    });

    this.formReady = true;

    console.log(tagFormGroups, this.form)
  }

  /**
   * On FORM Changes
   */
  private changeForm() {
      this.formChangesSubscription = this.form.valueChanges
      .subscribe((data) => { });
  }

  private initForm() {
    this.form.patchValue(this.stateService.data.detailPost);
  }

  get title(): FormControl {
    return <FormControl>this.form.controls['title'];
  }

  get published(): FormControl {
    return <FormControl>this.form.controls['published'];
  }

  private buildBreadcrumbs() {
    if (this.stateService.data.detailPost.original === '') {
      this.stateService.data.detailPost.original =
        'https://www.google.com/search?q=' +
        this.stateService.data.detailPost.original;
    }
    this.items = [
      {label: this.stateService.data.detailPost.title},
      {label: '', url: this.stateService.data.detailPost.original, icon: 'pi pi-external-link'}
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
