import { defineAsyncComponent } from "vue";
window.Fusion.booting(function(Vue, router, store) {
  Vue.component("antfusion-form", defineAsyncComponent(() => import("./AntFusionForm-616dab35.js")));
  Vue.component("antfusion-datatable", defineAsyncComponent(() => import("./DataTable-df391879.js")));
  Vue.component("panel-body", defineAsyncComponent(() => import("./PanelBody-625230e4.js")));
  Vue.component("antfusion-edit-link", defineAsyncComponent(() => import("./EditResourceLink-e7f6b834.js")));
  Vue.component("page-as-component", defineAsyncComponent(() => import("./PageAsComponent-39c0651e.js")));
  Vue.component("spinner", defineAsyncComponent(() => import("./Spinner-7f88fd0e.js")));
  Vue.component("parent-value", defineAsyncComponent(() => import("./ParentValue-9dc1d429.js")));
  Vue.component("print-button", defineAsyncComponent(() => import("./PrintButton-3d8e68a6.js")));
  Vue.component("action-button", defineAsyncComponent(() => import("./ActionButton-7a7f5b22.js")));
  Vue.component("action-dropdown-link", defineAsyncComponent(() => import("./ActionDropDownLink-cf80b078.js")));
  Vue.component("submit-button", defineAsyncComponent(() => import("./SubmitButton-27626a6c.js")));
  Vue.component("nested-component", defineAsyncComponent(() => import("./NestedComponent-e5e69d1d.js")));
  Vue.component("report-datatable", defineAsyncComponent(() => import("./ReportDataTable-a562b3a4.js")));
  Vue.component("resource-datatable", defineAsyncComponent(() => import("./ResourceDataTable-bd0d5e60.js")));
  Vue.component("resource-datetime", defineAsyncComponent(() => import("./ResourceDateTime-b9561504.js")));
  Vue.component("resource-date", defineAsyncComponent(() => import("./ResourceDate-6e488f7b.js")));
  Vue.component("resource-fieldtype", defineAsyncComponent(() => import("./Field-2d680bc7.js")));
  Vue.component("resource-fieldtype-setting", defineAsyncComponent(() => import("./Settings-af23ac13.js")));
  Vue.component("filter-tabs", defineAsyncComponent(() => import("./FilterTabs-a3ca4351.js")));
  Vue.component("antfusion-simple-wizard", defineAsyncComponent(() => import("./SimpleWizard-0511ab0a.js")));
  Vue.component("antfusion-html-table", defineAsyncComponent(() => import("./Table-31a9ef68.js")));
  Vue.component("antfusion-html-table-header-row", defineAsyncComponent(() => import("./TableHeaderRow-5b860b86.js")));
  Vue.component("metric-item", defineAsyncComponent(() => import("./MetricItem-ad498b5a.js")));
  Vue.component("component-container", defineAsyncComponent(() => import("./ComponentContainer-f7af4891.js")));
  const routes = [
    {
      path: "/resource/:resource",
      component: () => import("./Index-68ea9957.js"),
      name: "antfusion.resource",
      meta: {
        requiresAuth: true,
        layout: "admin"
      }
    },
    {
      path: "/resource/:resource/create",
      component: () => import("./Create-9a2e151d.js"),
      name: "antfusion.resource.create",
      meta: {
        requiresAuth: true,
        layout: "admin"
      }
    },
    {
      path: "/resource/:resource/:id/edit",
      component: () => import("./Edit-201e4c64.js"),
      name: "antfusion.resource.edit",
      meta: {
        requiresAuth: true,
        layout: "admin"
      }
    },
    {
      path: "/report/:report",
      component: () => import("./Index-62c8ec98.js"),
      name: "antfusion.report",
      meta: {
        requiresAuth: true,
        layout: "admin"
      }
    },
    {
      path: "/page/:page",
      component: () => import("./Index-6cb17871.js"),
      name: "antfusion.report",
      meta: {
        requiresAuth: true,
        layout: "admin"
      }
    }
  ];
  routes.forEach((route) => {
    router.addRoute(route);
  });
});
window.addEventListener("DOMContentLoaded", function() {
});
