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
  display = false;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() { 
    let me = this;

    me.ipc.send("catGetCategoryTypes")
    me.ipc.on("catGetCategoryTypesResultSent", function (evt, result) {
      console.log("catGetCategoryTypes", result)
      me.categoryTypes = result;
      me.ref.detectChanges()
    });
  }

}
