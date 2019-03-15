import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() { 
    let me = this;

    me.ipc.send("catGetCategoryTypes")
    me.ipc.on("catGetCategoryTypesResultSent", function (evt, result) {
      console.log("catGetCategoryTypes", result)
      me.categoryTypes = result;
      me.ref.detectChanges()
    });

    me.ipc.send("catGetCategoriesByType", 1)
    me.ipc.on("catGetCategoriesByTypeResultSent", function (evt, result) {
      console.log("catGetCategoriesByType", result)
      me.categoriesType = result;
      console.log(result)
      me.ref.detectChanges()
    });

    me.ipc.send("catGetCategories", 1)
    me.ipc.on("catGetCategoriesResultSent", function (evt, result) {
      result.map(item => {
        if (!me.categoriesType[item.TagTypeId]) {
          me.categoriesType[item.TagTypeId] = []
        }
        me.categoriesType[item.TagTypeId].push(item)        
      });
      console.log(me.categoriesType)
      me.ref.detectChanges()
    });
    
  }

  handleChange(e) {
    let me = this;
    me.index = e.index;
    me.ref.detectChanges()
  }

}
