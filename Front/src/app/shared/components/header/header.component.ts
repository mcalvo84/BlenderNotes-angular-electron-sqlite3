import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
declare let electron: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public ipc = electron.ipcRenderer;
  blenderLinks = [];
  selectedBlenderLick: any;
  items: MenuItem[];

  constructor() { }

  ngOnInit() {

    this.blenderLinks = [
      {name: 'Blender Hoy', code: 'NY'},
      {name: 'Dev Talk', code: 'RM'},
      {name: 'Right Click', code: 'LDN'},
      {name: 'Blender Cloud', code: 'IST'},
      {name: 'Blender.org', code: 'PRS'}
    ];
    this.items = [
      {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [{
                  label: 'New',
                  icon: 'pi pi-fw pi-plus',
                  items: [
                      {label: 'Project'},
                      {label: 'Other'},
                  ]
              },
              {label: 'Open'},
              {separator:true},
              {label: 'Quit'}
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      },
      {
          label: 'Help',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Contents'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-fw pi-search',
                  items: [
                      {
                          label: 'Text',
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'File'
                      }
              ]}
          ]
      },
      {
          label: 'Actions',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {label: 'Save', icon: 'pi pi-fw pi-save'},
                      {label: 'Update', icon: 'pi pi-fw pi-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
      },
      {separator:true},
      {
        label: 'Blogroll',
        icon: 'pi pi-fw pi-file',
        items: [{
            label: 'Blender.org',
            command: (event) => {
              electron.shell.openExternal('http://www.blender.org')
            }
          },{
            label: 'Dev Talk',
            command: (event) => {
              electron.shell.openExternal('http://www.blender.org')
            }
          },{
            label: 'Right Click',
            command: (event) => {
              electron.shell.openExternal('http://www.blender.org')
            }
          },{
            label: 'Blender Cloud',
            command: (event) => {
              electron.shell.openExternal('http://www.blender.org')
            }
          },{
            label: 'Blender Hoy',
            command: (event) => {
              electron.shell.openExternal('http://www.blender.org')
            }
          },
        ]
      },
      {separator:true},
      {
          label: 'Quit', icon: 'pi pi-fw pi-times'
      }
    ];
  }

  onClose() {
    const me = this;
    me.ipc.send('close-app');
  }

  onMaximize() {
    const me = this;
    me.ipc.send('maximize-app');
  }

  onMinimize() {
    const me = this;
    me.ipc.send('minimize-app');
  }
}
