(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./features/features.module": [
		"./src/app/features/features.module.ts",
		"features-features-module"
	],
	"./home/home.module": [
		"./src/app/features/home/home.module.ts",
		"home-home-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_error_error500_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/error/error500.component */ "./src/app/shared/error/error500.component.ts");
/* harmony import */ var _shared_error_error404_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/error/error404.component */ "./src/app/shared/error/error404.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', loadChildren: './features/features.module#FeaturesModule' },
    { path: 'error', component: _shared_error_error500_component__WEBPACK_IMPORTED_MODULE_2__["Error500Component"] },
    { path: '**', component: _shared_error_error404_component__WEBPACK_IMPORTED_MODULE_3__["Error404Component"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n\n<div class=\"\" id=\"main-window\">\n  <app-sidebar></app-sidebar>\n  <router-outlet></router-outlet>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent(ref) {
        this.ref = ref;
        this.title = 'my app';
        this.ipc = electron.ipcRenderer;
        this.list = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var me = this;
        me.ipc.send("postsGetPosts");
        me.ipc.on("postsGetPostsResultSent", function (evt, result) {
            console.log("postsGetPostsResultSent1", result);
            me.list = result;
            me.ref.detectChanges();
        });
    };
    AppComponent.prototype.onClickPost = function (id) {
        var me = this;
        me.ipc.send("postsGetPostById", id);
        me.ipc.on("postsGetPostByIdResultSent", function (evt, result) {
            console.log("postsGetPostByIdResultSent", result);
            me.list = result;
            me.ref.detectChanges();
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _core_core_module__WEBPACK_IMPORTED_MODULE_8__["CoreModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"]
            ],
            exports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"]],
            declarations: []
        })
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "./src/app/shared/components/header/header.component.css":
/*!***************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button,\nul.navbar-nav,\n.navbar-brand,\ndiv.nav-bar {\n    -webkit-app-region: no-drag;\n}\n\n\nnav.navbar.navbar-expand-lg.navbar-light.bg-light {\n    border-bottom: 1px solid #eee;\n    padding: 0 16px !important;\n}\n\n\n.ui-menubar.ui-widget.ui-widget-content.ui-corner-all {\n    border: 0;\n    background: transparent;\n}"

/***/ }),

/***/ "./src/app/shared/components/header/header.component.html":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\"  style=\"-webkit-app-region: drag\">\n  <a class=\"navbar-brand\" href=\"#\"><b>Blender Notes</b></a>\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarText\" aria-controls=\"navbarText\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse\" id=\"navbarText\">\n    <div class=\"nav-bar mr-auto\">\n        <p-menubar [model]=\"items\" [autoDisplay]=\"false\">\n        </p-menubar>\n    </div>\n    <span class=\"navbar-text\">\n        <span class=\"ui-float-label\">\n            <input id=\"float-input\" type=\"text\" size=\"30\" pInputText> \n            <label for=\"float-input\">Username</label>\n        </span>\n    </span>\n  </div>\n  <button class=\"btn btn-success mr-1 ml-2\" (click)=\"onMinimize()\" style=\"border-radius: 100%;height: 15px;width: 15px;padding: 0;\"></button>\n  <button class=\"btn btn-warning mr-1\" (click)=\"onMaximize()\" style=\"border-radius: 100%;height: 15px;width: 15px;padding: 0;\"></button>\n  <button class=\"btn btn-danger\" id=\"closeApp\" (click)=\"onClose()\" style=\"border-radius: 100%;height: 15px;width: 15px;padding: 0;\"></button>\n</nav>\n\n\n<!-- <div [ngClass]=\"{'ui-menubar ui-widget ui-widget-content ui-corner-all':true}\">\n  <div class=\"d-inline\">\n      <a class=\"navbar-brand\" href=\"#\">BlenderNotes CRUD</a>\n  </div>\n  <p-menubarSub [item]=\"items\" root=\"root\" [autoDisplay]=\"false\" [autoZIndex]=\"false\" [baseZIndex]=\"3001\">\n      <ng-content></ng-content>\n  </p-menubarSub>\n  <div class=\"d-inline mr-auto\"></div>\n  <div class=\"d-inline\">\n    <input type=\"text\" pInputText placeholder=\"Search\">\n    <button pButton label=\"Logout\" icon=\"fa fa-sign-out\" style=\"margin-left:.25em\"></button>\n  </div>\n  <div class=\"d-inline\">\n    <span class=\"navbar-text\">\n      [ ADMIN ZONE ]\n      <button class=\"btn btn-success mr-1 ml-2\" (click)=\"onMinimize()\" style=\"border-radius: 100%;height: 15px;width: 15px;padding: 0;\"></button>\n      <button class=\"btn btn-warning mr-1\" (click)=\"onMaximize()\" style=\"border-radius: 100%;height: 15px;width: 15px;padding: 0;\"></button>\n      <button class=\"btn btn-danger\" id=\"closeApp\" (click)=\"onClose()\" style=\"border-radius: 100%;height: 15px;width: 15px;padding: 0;\"></button>\n    </span>\n  </div>\n</div> -->"

/***/ }),

/***/ "./src/app/shared/components/header/header.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.ipc = electron.ipcRenderer;
        this.blenderLinks = [];
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.blenderLinks = [
            { name: 'Blender Hoy', code: 'NY' },
            { name: 'Dev Talk', code: 'RM' },
            { name: 'Right Click', code: 'LDN' },
            { name: 'Blender Cloud', code: 'IST' },
            { name: 'Blender.org', code: 'PRS' }
        ];
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
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
                        ]
                    }
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
                            { label: 'Save', icon: 'pi pi-fw pi-save' },
                            { label: 'Update', icon: 'pi pi-fw pi-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'pi pi-fw pi-tags',
                        items: [
                            { label: 'Delete', icon: 'pi pi-fw pi-minus' }
                        ]
                    }
                ]
            },
        ];
    };
    HeaderComponent.prototype.onClose = function () {
        var me = this;
        me.ipc.send('close-app');
    };
    HeaderComponent.prototype.onMaximize = function () {
        var me = this;
        me.ipc.send('maximize-app');
    };
    HeaderComponent.prototype.onMinimize = function () {
        var me = this;
        me.ipc.send('minimize-app');
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/shared/components/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/shared/components/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/sidebar/sidebar.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/shared/components/sidebar/sidebar.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-sidebar-fixed {\n    width: 300px;\n    float: left;\n}\n\n:host >>> .ui-tabview-left > .ui-tabview-nav {\n    width: 30px;\n}\n\n:host >>> .ui-tabview-left>.ui-tabview-panels {\n    width: calc(100% - 30px);;\n    height: calc(100vh - 70px);\n}\n\n:host >>> .ui-tabview .ui-tabview-panels {\n    background-color: #ddd;\n    border: none;\n    color: #333;\n}\n\n:host >>> .ui-tabview.ui-tabview-top .ui-tabview-nav li.ui-state-active, \n:host >>> .ui-tabview.ui-tabview-bottom .ui-tabview-nav li.ui-state-active, \n:host >>> .ui-tabview.ui-tabview-left .ui-tabview-nav li.ui-state-active, \n:host >>> .ui-tabview.ui-tabview-right .ui-tabview-nav li.ui-state-active {\n    background-color: #ddd;\n    border: 1px solid #ddd;\n    position: relative;\n    left: 5px;\n}\n\n:host >>> .ui-tabview.ui-tabview-top .ui-tabview-nav li:hover, \n:host >>> .ui-tabview.ui-tabview-bottom .ui-tabview-nav li:hover, \n:host >>> .ui-tabview.ui-tabview-left .ui-tabview-nav li:hover, \n:host >>> .ui-tabview.ui-tabview-right .ui-tabview-nav li:hover {\n    border: 1px solid #ddd;\n    background-color: #ddd;\n}\n\n:host >>> .ui-tabview.ui-tabview-top .ui-tabview-nav li a, \n:host >>> .ui-tabview.ui-tabview-bottom .ui-tabview-nav li a, \n:host >>> .ui-tabview.ui-tabview-left .ui-tabview-nav li a, \n:host >>> .ui-tabview.ui-tabview-right .ui-tabview-nav li a {\n    padding: 0 0.28em 0.5em;\n    color: #333;\n}\n\n:host >>> .ui-tabview.ui-tabview-top .ui-tabview-nav li.ui-state-active:hover, \n:host >>> .ui-tabview.ui-tabview-bottom .ui-tabview-nav li.ui-state-active:hover, \n:host >>> .ui-tabview.ui-tabview-left .ui-tabview-nav li.ui-state-active:hover, \n:host >>> .ui-tabview.ui-tabview-right .ui-tabview-nav li.ui-state-active:hover {\n    border: 1px solid #ddd;\n    background-color: #ddd;\n}\n"

/***/ }),

/***/ "./src/app/shared/components/sidebar/sidebar.component.html":
/*!******************************************************************!*\
  !*** ./src/app/shared/components/sidebar/sidebar.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <p-sidebar [(visible)]=\"display\" [showCloseIcon]=\"false\"> -->\n<div class=\"app-sidebar-fixed\">\n  <p-tabView orientation=\"left\" [activeIndex]=\"index\" (onChange)=\"handleChange($event)\">\n    <p-tabPanel \n    [header]=\"\" \n    *ngFor=\"let item of categoryTypes; let i = index\" \n    leftIcon=\"fa fa-check\" \n    [selected]=\"i == index\">\n        <h5>{{item.name}}</h5>\n        <hr style=\"border-color: #aaa;\" />\n        <span *ngFor=\"let c of categoriesType[i+1]\">\n          <button #categoryitem class=\"btn btn-sm btn-secondary m-1\" style=\"font-size: 0.9em;\" >\n            {{c.name}}\n          </button>\n        </span>\n    </p-tabPanel>\n  </p-tabView>\n</div>\n<!-- </p-sidebar> -->\n\n<p-contextMenu [target]=\"categoryitem\" [model]=\"rightClick\"></p-contextMenu>"

/***/ }),

/***/ "./src/app/shared/components/sidebar/sidebar.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/sidebar/sidebar.component.ts ***!
  \****************************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(ref) {
        this.ref = ref;
        this.ipc = electron.ipcRenderer;
        this.categoryTypes = [];
        this.categoriesType = {};
        this.display = false;
        this.index = 0;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var me = this;
        me.ipc.send("catGetCategoryTypes");
        me.ipc.on("catGetCategoryTypesResultSent", function (evt, result) {
            console.log("catGetCategoryTypes", result);
            me.categoryTypes = result;
            me.ref.detectChanges();
        });
        me.ipc.send("catGetCategoriesByType", 1);
        me.ipc.on("catGetCategoriesByTypeResultSent", function (evt, result) {
            console.log("catGetCategoriesByType", result);
            me.categoriesType = result;
            console.log(result);
            me.ref.detectChanges();
        });
        me.ipc.send("catGetCategories", 1);
        me.ipc.on("catGetCategoriesResultSent", function (evt, result) {
            result.map(function (item) {
                if (!me.categoriesType[item.TagTypeId]) {
                    me.categoriesType[item.TagTypeId] = [];
                }
                me.categoriesType[item.TagTypeId].push(item);
            });
            console.log(me.categoriesType);
            me.ref.detectChanges();
        });
    };
    SidebarComponent.prototype.handleChange = function (e) {
        var me = this;
        me.index = e.index;
        me.ref.detectChanges();
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/shared/components/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.css */ "./src/app/shared/components/sidebar/sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/shared/error/error404.component.html":
/*!******************************************************!*\
  !*** ./src/app/shared/error/error404.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ocs-error ux-u-text-align-center\">\n    <img src=\"/assets/img/decorative-image-error404.svg\" alt=\"\" style=\"border-radius: 100%;\">\n    <br/>\n    <div class=\"ocs-error-title text-center\">\n        <h1>{{ 'screen.2999.error404.title' }}</h1>\n    </div>\n    <hr />\n    <div class=\"ocs-error-subtitle text-center\">\n        <h4>{{ 'screen.2999.error404.subtitle' }}</h4>\n    </div>\n    <div class=\"ocs-error-info text-center\">\n        <p>{{ 'screen.2999.error404.info' }}</p>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/shared/error/error404.component.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/error/error404.component.ts ***!
  \****************************************************/
/*! exports provided: Error404Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error404Component", function() { return Error404Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Error404Component = /** @class */ (function () {
    function Error404Component() {
    }
    Error404Component.prototype.ngOnInit = function () { };
    Error404Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./error404.component.html */ "./src/app/shared/error/error404.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], Error404Component);
    return Error404Component;
}());



/***/ }),

/***/ "./src/app/shared/error/error500.component.html":
/*!******************************************************!*\
  !*** ./src/app/shared/error/error500.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ocs-error ux-u-text-align-center\">\n    <img src=\"/assets/img/decorative-image-error500.svg\" alt=\"\" style=\"border-radius: 100%;\">\n    <br/>\n    <div class=\"ocs-error-title text-center\">\n        <h1>{{ 'screen.2999.error500.title' }}</h1>\n    </div>\n    <hr />\n    <div class=\"ocs-error-subtitle text-center\">\n        <h4>{{ 'screen.2999.error500.subtitle' }}</h4>\n    </div>\n    <div class=\"ocs-error-info text-center\">\n        <p>{{ 'screen.2999.error500.info' }}</p>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/shared/error/error500.component.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/error/error500.component.ts ***!
  \****************************************************/
/*! exports provided: Error500Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error500Component", function() { return Error500Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Error500Component = /** @class */ (function () {
    function Error500Component() {
    }
    Error500Component.prototype.ngOnInit = function () { };
    Error500Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./error500.component.html */ "./src/app/shared/error/error500.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], Error500Component);
    return Error500Component;
}());



/***/ }),

/***/ "./src/app/shared/pipes/array.pipe.ts":
/*!********************************************!*\
  !*** ./src/app/shared/pipes/array.pipe.ts ***!
  \********************************************/
/*! exports provided: FilterPipe, SortByPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortByPipe", function() { return SortByPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * USAGE:
 * <tr *ngFor="let song of songs | appFilter : term | appSortBy: 'likes'">
 * songs = [
 *    {
 *      title: 'Song 1',
 *      likes: 25
 *    },
 *    {
 *      title: 'Song 5',
 *      likes: 50
 *    },
 *    {
 *      title: 'Song 10',
 *      likes: 10
 *    }
 *  ]
 */
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, term) {
        return term
            ? items.filter(function (item) { return item.title.indexOf(term) !== -1; })
            : items;
    };
    FilterPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'appFilter',
            pure: false
        })
    ], FilterPipe);
    return FilterPipe;
}());

var SortByPipe = /** @class */ (function () {
    function SortByPipe() {
    }
    SortByPipe.prototype.transform = function (items, sortedBy) {
        return items.sort(function (a, b) { return b[sortedBy] - a[sortedBy]; });
    };
    SortByPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'appSortBy'
        })
    ], SortByPipe);
    return SortByPipe;
}());



/***/ }),

/***/ "./src/app/shared/pipes/camel-to-snake.ts":
/*!************************************************!*\
  !*** ./src/app/shared/pipes/camel-to-snake.ts ***!
  \************************************************/
/*! exports provided: CamelToSnakePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CamelToSnakePipe", function() { return CamelToSnakePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * Convert camelCase into snake-case.
 */
var CamelToSnakePipe = /** @class */ (function () {
    function CamelToSnakePipe() {
    }
    CamelToSnakePipe.prototype.transform = function (value, snake) {
        if (snake === void 0) { snake = '-'; }
        var upperChars = value.match(/([A-Z])/g);
        if (!upperChars) {
            return value;
        }
        var str = value.toString();
        for (var i = 0, n = upperChars.length; i < n; i++) {
            str = str.replace(new RegExp(upperChars[i]), snake + upperChars[i].toLowerCase());
        }
        if (str.slice(0, 1) === snake) {
            str = str.slice(1);
        }
        return str;
    };
    CamelToSnakePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'appCamelToSnake'
        })
    ], CamelToSnakePipe);
    return CamelToSnakePipe;
}());



/***/ }),

/***/ "./src/app/shared/pipes/default-image.pipe.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/pipes/default-image.pipe.ts ***!
  \****************************************************/
/*! exports provided: DefaultImagePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultImagePipe", function() { return DefaultImagePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * USAGE:
 * <img [src]="imageUrl | appDefaultImage:'http://url-to-img/128.jpg':true"/>
 */
var DefaultImagePipe = /** @class */ (function () {
    function DefaultImagePipe() {
    }
    DefaultImagePipe.prototype.transform = function (value, fallback, forceHttps) {
        if (forceHttps === void 0) { forceHttps = false; }
        var image = '';
        if (value) {
            image = value;
        }
        else {
            image = fallback;
        }
        if (forceHttps) {
            if (image.indexOf('https') === -1) {
                image = image.replace('http', 'https');
            }
        }
        return image;
    };
    DefaultImagePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'appDefaultImage'
        })
    ], DefaultImagePipe);
    return DefaultImagePipe;
}());



/***/ }),

/***/ "./src/app/shared/pipes/file-size.pipe.ts":
/*!************************************************!*\
  !*** ./src/app/shared/pipes/file-size.pipe.ts ***!
  \************************************************/
/*! exports provided: FileSizePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileSizePipe", function() { return FileSizePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that defaults to 2.
 * Usage:
 *   bytes | appFileSize:precision
 * Example:
 *   {{ 1024 |  fileSize}}
 *   formats to: 1 KB
 */
var FileSizePipe = /** @class */ (function () {
    function FileSizePipe() {
        this.units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    }
    FileSizePipe.prototype.transform = function (bytes, precision) {
        if (bytes === void 0) { bytes = 0; }
        if (precision === void 0) { precision = 2; }
        if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
            return '?';
        }
        var unit = 0;
        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }
        return bytes.toFixed(+precision) + ' ' + this.units[unit];
    };
    FileSizePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'appFileSize'
        })
    ], FileSizePipe);
    return FileSizePipe;
}());



/***/ }),

/***/ "./src/app/shared/pipes/fix-url.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/pipes/fix-url.ts ***!
  \*****************************************/
/*! exports provided: FixUrlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixUrlPipe", function() { return FixUrlPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * Convert camelCase into snake-case.
 */
var FixUrlPipe = /** @class */ (function () {
    function FixUrlPipe() {
    }
    FixUrlPipe.prototype.transform = function (value) {
        if (value.substring(0, 4).toLowerCase() === 'http') {
            return value;
        }
        else {
            return '//' + value;
        }
    };
    FixUrlPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'appFixUrl'
        })
    ], FixUrlPipe);
    return FixUrlPipe;
}());



/***/ }),

/***/ "./src/app/shared/pipes/ordinal.pipe.ts":
/*!**********************************************!*\
  !*** ./src/app/shared/pipes/ordinal.pipe.ts ***!
  \**********************************************/
/*! exports provided: OrdinalPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdinalPipe", function() { return OrdinalPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ordinals = ['th', 'st', 'nd', 'rd'];
/*
 * Append ordinal to number (e.g. "1st" position)
 * Usage:
 *   value | ordinal:keepNumber
 * Example:
 *   {{ 23 |  ordinal}}
 *   formats to: '23rd'
 * Example:
 *   {{ 23 |  ordinal:false}}
 *   formats to: 'rd'
*/
var OrdinalPipe = /** @class */ (function () {
    function OrdinalPipe() {
    }
    OrdinalPipe.prototype.transform = function (n, keepNumber) {
        if (keepNumber === void 0) { keepNumber = true; }
        var v = n % 100;
        return (keepNumber ? n : '') + (ordinals[(v - 20) % 10] || ordinals[v] || ordinals[0]);
    };
    OrdinalPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'appOrdinal'
        })
    ], OrdinalPipe);
    return OrdinalPipe;
}());



/***/ }),

/***/ "./src/app/shared/pipes/pipes.module.ts":
/*!**********************************************!*\
  !*** ./src/app/shared/pipes/pipes.module.ts ***!
  \**********************************************/
/*! exports provided: PipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipesModule", function() { return PipesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _file_size_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-size.pipe */ "./src/app/shared/pipes/file-size.pipe.ts");
/* harmony import */ var _default_image_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default-image.pipe */ "./src/app/shared/pipes/default-image.pipe.ts");
/* harmony import */ var _ordinal_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ordinal.pipe */ "./src/app/shared/pipes/ordinal.pipe.ts");
/* harmony import */ var _truncate_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./truncate.pipe */ "./src/app/shared/pipes/truncate.pipe.ts");
/* harmony import */ var _array_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./array.pipe */ "./src/app/shared/pipes/array.pipe.ts");
/* harmony import */ var _camel_to_snake__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./camel-to-snake */ "./src/app/shared/pipes/camel-to-snake.ts");
/* harmony import */ var _fix_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fix-url */ "./src/app/shared/pipes/fix-url.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// PIPEs







var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _file_size_pipe__WEBPACK_IMPORTED_MODULE_1__["FileSizePipe"],
                _default_image_pipe__WEBPACK_IMPORTED_MODULE_2__["DefaultImagePipe"],
                _ordinal_pipe__WEBPACK_IMPORTED_MODULE_3__["OrdinalPipe"],
                _truncate_pipe__WEBPACK_IMPORTED_MODULE_4__["TruncatePipe"],
                _array_pipe__WEBPACK_IMPORTED_MODULE_5__["FilterPipe"],
                _array_pipe__WEBPACK_IMPORTED_MODULE_5__["SortByPipe"],
                _camel_to_snake__WEBPACK_IMPORTED_MODULE_6__["CamelToSnakePipe"],
                _fix_url__WEBPACK_IMPORTED_MODULE_7__["FixUrlPipe"]
            ],
            exports: [
                _file_size_pipe__WEBPACK_IMPORTED_MODULE_1__["FileSizePipe"],
                _default_image_pipe__WEBPACK_IMPORTED_MODULE_2__["DefaultImagePipe"],
                _ordinal_pipe__WEBPACK_IMPORTED_MODULE_3__["OrdinalPipe"],
                _truncate_pipe__WEBPACK_IMPORTED_MODULE_4__["TruncatePipe"],
                _array_pipe__WEBPACK_IMPORTED_MODULE_5__["FilterPipe"],
                _array_pipe__WEBPACK_IMPORTED_MODULE_5__["SortByPipe"],
                _camel_to_snake__WEBPACK_IMPORTED_MODULE_6__["CamelToSnakePipe"],
                _fix_url__WEBPACK_IMPORTED_MODULE_7__["FixUrlPipe"]
            ],
        })
    ], PipesModule);
    return PipesModule;
}());



/***/ }),

/***/ "./src/app/shared/pipes/truncate.pipe.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/pipes/truncate.pipe.ts ***!
  \***********************************************/
/*! exports provided: TruncatePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TruncatePipe", function() { return TruncatePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TruncatePipe = /** @class */ (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, limit) {
        return value.length > +limit ? value.substring(0, +limit) + '...' : value;
    };
    TruncatePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'appTruncate'
        })
    ], TruncatePipe);
    return TruncatePipe;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/shared/components/header/header.component.ts");
/* harmony import */ var _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sidebar/sidebar.component */ "./src/app/shared/components/sidebar/sidebar.component.ts");
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/sidebar */ "./node_modules/primeng/sidebar.js");
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeng_sidebar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var primeng_tabview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/tabview */ "./node_modules/primeng/tabview.js");
/* harmony import */ var primeng_tabview__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_tabview__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/dropdown */ "./node_modules/primeng/dropdown.js");
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_dropdown__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var primeng_menubar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/menubar */ "./node_modules/primeng/menubar.js");
/* harmony import */ var primeng_menubar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_menubar__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/scrollpanel */ "./node_modules/primeng/scrollpanel.js");
/* harmony import */ var primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/inputtext */ "./node_modules/primeng/inputtext.js");
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_inputtext__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var primeng_contextmenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/contextmenu */ "./node_modules/primeng/contextmenu.js");
/* harmony import */ var primeng_contextmenu__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_contextmenu__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _error_error404_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./error/error404.component */ "./src/app/shared/error/error404.component.ts");
/* harmony import */ var _error_error500_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./error/error500.component */ "./src/app/shared/error/error500.component.ts");
/* harmony import */ var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pipes/pipes.module */ "./src/app/shared/pipes/pipes.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                primeng_sidebar__WEBPACK_IMPORTED_MODULE_5__["SidebarModule"],
                primeng_tabview__WEBPACK_IMPORTED_MODULE_6__["TabViewModule"],
                primeng_dropdown__WEBPACK_IMPORTED_MODULE_7__["DropdownModule"],
                primeng_menubar__WEBPACK_IMPORTED_MODULE_8__["MenubarModule"],
                primeng_inputtext__WEBPACK_IMPORTED_MODULE_10__["InputTextModule"],
                primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_9__["ScrollPanelModule"],
                primeng_contextmenu__WEBPACK_IMPORTED_MODULE_11__["ContextMenuModule"],
                _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_14__["PipesModule"]
            ],
            declarations: [
                _error_error404_component__WEBPACK_IMPORTED_MODULE_12__["Error404Component"],
                _error_error500_component__WEBPACK_IMPORTED_MODULE_13__["Error500Component"],
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"],
                _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__["SidebarComponent"]
            ],
            exports: [
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"],
                _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__["SidebarComponent"],
                _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_14__["PipesModule"]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/mcalvoca/Proyectos/blognotes/Front/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map