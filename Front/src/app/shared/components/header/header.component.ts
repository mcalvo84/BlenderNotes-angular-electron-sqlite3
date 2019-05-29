import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FeedService } from 'src/app/features/feeds/feed.service';
import { StateService } from 'src/app/core/state.service';
declare let electron: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public ipc = electron.ipcRenderer;
  // blenderLinks = [];
  selectedBlenderLick: any;
  items: MenuItem[];
  items2: MenuItem[];

  constructor(
    public feedService: FeedService,
    public stateService: StateService,
  ) { }

  ngOnInit() {

    // this.blenderLinks = [
    //   {name: 'Blender Hoy', code: 'NY'},
    //   {name: 'Dev Talk', code: 'RM'},
    //   {name: 'Right Click', code: 'LDN'},
    //   {name: 'Blender Cloud', code: 'IST'},
    //   {name: 'Blender.org', code: 'PRS'}
    // ];
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
            this.stateService.data.currentBlogroll = 'https://www.blendernation.com/feed/';
            this.feedService.show = true;
            //electron.shell.openExternal('http://www.blender.org')
          }
        }, {
          label: 'Blender Guru',
          command: (event) => {
            this.stateService.data.currentBlogroll = 'https://www.blendernation.com/feed/';
            this.feedService.show = true;
            //electron.shell.openExternal('http://www.blender.org')
          }
        }, {
          label: 'CG Cookie',
          items: [
            {
              label: 'Articles',
              command: (event) => {
                this.stateService.data.currentBlogroll = 'https://cgcookie.com/feeds/articles.rss';
                this.feedService.show = true;
                //electron.shell.openExternal('http://www.blender.org')
              }
            }, {
              label: 'Tutorials',
              command: (event) => {
                this.stateService.data.currentBlogroll = 'https://cgcookie.com/feeds/tutorials.rss';
                this.feedService.show = true;
                //electron.shell.openExternal('http://www.blender.org')
              }
            }, {
              label: 'Resources',
              command: (event) => {
                this.stateService.data.currentBlogroll = 'https://cgcookie.com/feeds/resources.rss';
                this.feedService.show = true;
                //electron.shell.openExternal('http://www.blender.org')
              }
            }, {
              label: 'Flows',
              command: (event) => {
                this.stateService.data.currentBlogroll = 'https://cgcookie.com/feeds/flows.rss';
                this.feedService.show = true;
                //electron.shell.openExternal('http://www.blender.org')
              }
            }, {
              label: 'Courses',
              command: (event) => {
                this.stateService.data.currentBlogroll = 'https://cgcookie.com/feeds/courses.rss';
                this.feedService.show = true;
                //electron.shell.openExternal('http://www.blender.org')
              }
            }, {
              label: 'Exercises',
              command: (event) => {
                this.stateService.data.currentBlogroll = 'https://cgcookie.com/feeds/exercises.rss';
                this.feedService.show = true;
                //electron.shell.openExternal('http://www.blender.org')
              }
            },
          ]
        }]
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
