'use strict';

// Meta data used by the AngularJS docs app
angular.module('navData', [])
  .value('NG_NAVIGATION', {
  "index.ngdoc": {
    "id": "index.ngdoc",
    "navGroups": [
      {
        "type": "group",
        "href": "index.ngdoc",
        "navItems": [
          {
            "name": "API Reference",
            "href": "index",
            "type": "page"
          }
        ]
      }
    ]
  },
  "api": {
    "id": "api",
    "name": "API",
    "navGroups": [
      {
        "name": "ui.dimmer",
        "href": null,
        "type": "group",
        "navItems": [
          {
            "name": "type",
            "type": "section",
            "href": "api/ui.dimmer/type"
          },
          {
            "name": "ui.dimmer.DimmableController",
            "href": "api/ui.dimmer/type/ui.dimmer.DimmableController",
            "type": "type"
          },
          {
            "name": "ui.dimmer.DimmerController",
            "href": "api/ui.dimmer/type/ui.dimmer.DimmerController",
            "type": "type"
          },
          {
            "name": "directive",
            "type": "section",
            "href": "api/ui.dimmer/directive"
          },
          {
            "name": "ui.dimmer.directive:dimmer",
            "href": "api/ui.dimmer/directive/ui.dimmer.directive:dimmer",
            "type": "directive"
          },
          {
            "name": "module",
            "type": "section",
            "href": "api"
          },
          {
            "name": "ui.dimmer",
            "href": "api/ui.dimmer",
            "type": "module"
          }
        ]
      },
      {
        "name": "ui.modal",
        "href": null,
        "type": "group",
        "navItems": [
          {
            "name": "type",
            "type": "section",
            "href": "api/ui.modal/type"
          },
          {
            "name": "ui.modal.ModalController",
            "href": "api/ui.modal/type/ui.modal.ModalController",
            "type": "type"
          },
          {
            "name": "module",
            "type": "section",
            "href": "api"
          },
          {
            "name": "ui.modal",
            "href": "api/ui.modal",
            "type": "module"
          }
        ]
      },
      {
        "name": "modal",
        "href": null,
        "type": "group",
        "navItems": [
          {
            "name": "service",
            "type": "section",
            "href": "api/modal/service"
          },
          {
            "name": "modalService",
            "href": "api/modal/service/modalService",
            "type": "service"
          },
          {
            "name": "type",
            "type": "section",
            "href": "api/modal/type"
          },
          {
            "name": "Modal",
            "href": "api/modal/type/Modal",
            "type": "type"
          }
        ]
      },
      {
        "name": "ui.sidebar",
        "href": null,
        "type": "group",
        "navItems": [
          {
            "name": "type",
            "type": "section",
            "href": "api/ui.sidebar/type"
          },
          {
            "name": "ui.sidebar.SidebarController",
            "href": "api/ui.sidebar/type/ui.sidebar.SidebarController",
            "type": "type"
          },
          {
            "name": "directive",
            "type": "section",
            "href": "api/ui.sidebar/directive"
          },
          {
            "name": "ui.sidebar.directive:sidebar",
            "href": "api/ui.sidebar/directive/ui.sidebar.directive:sidebar",
            "type": "directive"
          }
        ]
      },
      {
        "name": "sidebar",
        "href": null,
        "type": "group",
        "navItems": [
          {
            "name": "module",
            "type": "section",
            "href": "api"
          },
          {
            "name": "ui.sidebar",
            "href": "api/ui.sidebar",
            "type": "module"
          }
        ]
      },
      {
        "name": "ui.tab",
        "href": null,
        "type": "group",
        "navItems": [
          {
            "name": "type",
            "type": "section",
            "href": "api/ui.tab/type"
          },
          {
            "name": "ui.tab.ItemController",
            "href": "api/ui.tab/type/ui.tab.ItemController",
            "type": "type"
          },
          {
            "name": "ui.tab.MenuController",
            "href": "api/ui.tab/type/ui.tab.MenuController",
            "type": "type"
          },
          {
            "name": "ui.tab.TabController",
            "href": "api/ui.tab/type/ui.tab.TabController",
            "type": "type"
          }
        ]
      },
      {
        "name": "ui",
        "href": null,
        "type": "group",
        "navItems": [
          {
            "name": "module",
            "type": "section",
            "href": "api"
          },
          {
            "name": "ui",
            "href": "api/ui",
            "type": "module"
          }
        ]
      }
    ]
  }
});
