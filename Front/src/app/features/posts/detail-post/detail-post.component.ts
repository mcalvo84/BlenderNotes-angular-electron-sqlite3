import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { StateService } from 'src/app/core/state.service';
import { PostsService } from 'src/app/core/api/posts.service';
import { NotesService } from 'src/app/core/api/notes.service';
import { TagsService } from 'src/app/core/api/tags.service';
import { IPost } from 'src/app/core/models/posts';
import { FileUpload } from 'primeng/fileupload';
import { Location } from '@angular/common';
declare let electron: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPostComponent implements OnInit, OnDestroy {

  @ViewChild(FileUpload) fileUpload: FileUpload;

  // State
  private stateSuscription: Subscription = new Subscription();
  private stateItems = ['', 'detailPost', 'detailPostTags'];
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
  tagCategories: string[] = [];
  myfile = [];
  public Editor = ClassicEditor;

  videoName = '';
  videoId = '';

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private tagsService: TagsService,
    private notesService: NotesService,
    public stateService: StateService,
    public ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    public location: Location,
    public sanitizer: DomSanitizer
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
        console.log(location.prepareExternalUrl(location.path()))
        this.initForm();
        this.buildBreadcrumbs();
        if (element !== 'detailPostTags') {
          this.tagsService.send('[tags][get][fromPost]', this.id);
        } else {
          this.matchTags();
        }
        this.ref.detectChanges();
      }
    });

    // Get detail of post or create new one
    this.id = this.route.snapshot.params.id;
    if (this.id > 0) {
      this.postsService.send('[posts][get][byID]', this.id);
      this.notesService.send('[notes][get][fromPost]', this.id);
      this.postsService.send('[downloads][get][fromPost]', this.id);
      this.postsService.send('[videos][get][fromPost]', this.id);
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

    this.postsService.send('[videos][download]', this.id);

    const post = this.form.value;

    let p = {
      title: post.title,
      body: post.body,
      original: post.original,
      published: post.published,
      // updatedAt: new Date().toLocaleDateString()
    }

    // this.postsService.send('[post][update][simple]', p, this.id);

    let newTags = [];
    this.tagCategories.forEach(TagCategory => {
      if (this.form.get('tags').value[TagCategory]) {
        newTags = [ ...newTags, ...this.form.get('tags').value[TagCategory]];
      }
    });

    this.postsService.send('[post][update][complex]', p, this.id, newTags);
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

  onTagChange(e) {
    //console.log(e, this.tagMultiselectValues, this.form.get('tags'));
    this.ref.detectChanges();
  }

  /**
   * FORM creation
   */
  private buildForm() {

    let tagFormGroups = {};

    this.stateService.data.tagTypes.forEach(element => {
      this.tagCategories.push(element.name);
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
      'createdAt': [null],
      'updatedAt': [null],
      'BlogrollId': [null],
      'ImageId': [null],
      'UserId': [null],
      'original': [null],
      'file': [[]],
      'Videos': [null],
      'videoName': [[]],
      'videoId': [[]],
      'tags': this.fb.group(tagFormGroups)
    });

    this.formReady = true;

    console.log(tagFormGroups, this.form)
  }

  matchTags() {
    Object.keys(this.stateService.data.detailPostTags).forEach(key => {
      this.form.get('tags').get(key).setValue(this.stateService.data.detailPostTags[key]);
    });
  }

  onBasicUpload(evt, fileUpload) {
    this.postsService.send('[downloads][add]', evt['files'][0]['path'], this.id);
    fileUpload.clear();
    this.ref.detectChanges();
    this.myfile = [];
  }

  onDeleteFile(file) {
    this.postsService.send('[downloads][remove][fromPost]', file.id, this.id);
  }

  onBasicSelect(evt) {
    this.ref.detectChanges();
  }

  openFile(url, name) {
    this.postsService.send('[open][file]', url, name);
  }

  onAddVideo() {
    this.postsService.send('[videos][add]', this.form.controls['videoName'].value, this.form.controls['videoId'].value, this.id);
  }

  onDeleteVideo(video) {
    this.postsService.send('[videos][remove][fromPost]', video.id, this.id);
  }

  getIframe(key) {
    return this.sanitizer.bypassSecurityTrustHtml('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>');
  }

  getCategoriesReadMode(tagCat) {
    console.log('getCategoriesReadMode', this.tagsControl.value[tagCat]);
    if (this.tagsControl && this.tagsControl.value && this.tagsControl.value[tagCat]) {
      return this.tagMultiselectValues[tagCat].filter((value, idx) => -1 !== this.tagsControl.value[tagCat].indexOf(idx));
    }
    return [];
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

  get tagsControl(): FormControl {
    return <FormControl>this.form.controls['tags'];
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
