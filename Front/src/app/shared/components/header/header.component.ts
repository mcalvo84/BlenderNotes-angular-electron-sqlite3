import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FeedService } from 'src/app/features/feeds/feed.service';
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
  items2: MenuItem[];

  constructor(public feedService: FeedService) { }

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
      }
    ];

    this.items2 = [
      {
        label: 'Blender',
        icon: 'pi pi-fw pi-file',
        items: [{
            label: 'Blender.org',
            command: (event) => {
              //this.feedService.show = true;
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
      {
        label: 'Blogroll',
        icon: 'pi pi-fw pi-file',
        items: [{
            label: 'Blender Nation',
            command: (event) => {
              this.feedService.show = true;
              //electron.shell.openExternal('http://www.blender.org')
            }
          }
        ]
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
