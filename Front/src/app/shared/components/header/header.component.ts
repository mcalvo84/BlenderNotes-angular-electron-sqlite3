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
          label: 'Archivo',
          icon: 'pi pi-fw pi-file',
          items: [{
                  label: 'New',
                  icon: 'pi pi-fw pi-plus',
                  items: [
                      {label: 'Artículos'},
                      {label: 'Borradores'},
                      {label: 'Grupo de tags'},
                      {label: 'Tag'}
                  ]
              },
              {separator:true},
              {label: 'Salir'}
          ]
      },
      {
          label: 'Ver',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Inicio', icon: 'pi pi-fw pi-trash'},
              {label: 'Posts', icon: 'pi pi-fw pi-refresh'},
              {label: 'Borradores', icon: 'pi pi-fw pi-refresh'},
              {separator:true},
              {label: 'Configuración'}
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
