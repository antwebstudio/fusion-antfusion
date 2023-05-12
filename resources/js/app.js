// import DateRangePicker from 'vue2-daterange-picker'
// import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
// import Fragment from 'vue-fragment'

import { defineAsyncComponent } from 'vue'

window.Fusion.booting(function(Vue, router, store) {
    // Vue.use(Fragment.Plugin)

    // Vue.component('date-range-picker', DateRangePicker)
    Vue.component('antfusion-form', defineAsyncComponent(() => import('./components/AntFusionForm.vue')))
    Vue.component('antfusion-datatable', defineAsyncComponent(() => import('./components/DataTable.vue')))
    // Vue.component('antfusion-panel', defineAsyncComponent(() => import('./components/Panel.vue')))
    Vue.component('panel-body', defineAsyncComponent(() => import('./components/PanelBody.vue')))
    Vue.component('antfusion-edit-link', defineAsyncComponent(() => import('./components/EditResourceLink.vue')))
    Vue.component('page-as-component', defineAsyncComponent(() => import('./components/PageAsComponent.vue')))
    Vue.component('spinner', defineAsyncComponent(() => import('./components/Spinner.vue')))
    Vue.component('parent-value', defineAsyncComponent(() => import('./components/ParentValue.vue')))
    Vue.component('print-button', defineAsyncComponent(() => import('./components/PrintButton.vue')))
    Vue.component('action-button', defineAsyncComponent(() => import('./components/ActionButton.vue')))
    Vue.component('action-dropdown-link', defineAsyncComponent(() => import('./components/ActionDropDownLink.vue')))
    Vue.component('submit-button', defineAsyncComponent(() => import('./components/SubmitButton.vue')))
    Vue.component('nested-component', defineAsyncComponent(() => import('./components/NestedComponent.vue')))
    Vue.component('report-datatable', defineAsyncComponent(() => import('./components/ReportDataTable.vue')))
    Vue.component('resource-datatable', defineAsyncComponent(() => import('./components/ResourceDataTable.vue')))
    Vue.component('resource-datetime', defineAsyncComponent(() => import('./components/ResourceDateTime.vue')))
    Vue.component('resource-date', defineAsyncComponent(() => import('./components/ResourceDate.vue')))
    Vue.component('resource-fieldtype', defineAsyncComponent(() => import('./fieldtypes/Resource/Field.vue')))
    Vue.component('resource-fieldtype-setting', defineAsyncComponent(() => import('./fieldtypes/Resource/Settings.vue')))
    Vue.component('filter-tabs', defineAsyncComponent(() => import('./components/FilterTabs.vue')))
    Vue.component('antfusion-simple-wizard', defineAsyncComponent(() => import('./components/SimpleWizard.vue')))
    Vue.component('antfusion-html-table', defineAsyncComponent(() => import('./components/Table.vue')))
    Vue.component('antfusion-html-table-header-row', defineAsyncComponent(() => import('./components/TableHeaderRow.vue')))
    Vue.component('metric-item', defineAsyncComponent(() => import('./components/MetricItem.vue')))
    Vue.component('component-container', defineAsyncComponent(() => import('./components/ComponentContainer.vue')))

	const routes = [
		{
			path: '/resource/:resource',
            component: () => import('./pages/Resource/Index.vue'),
            name: 'antfusion.resource',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
		{
			path: '/resource/:resource/create',
            component: () => import('./pages/Resource/Create.vue'),
            name: 'antfusion.resource.create',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
		{
			path: '/resource/:resource/:id/edit',
            component: () => import('./pages/Resource/Edit.vue'),
            name: 'antfusion.resource.edit',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
		{
			path: '/report/:report', 
            component: () => import('./pages/Report/Index.vue'),
            name: 'antfusion.report',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
		{
			path: '/page/:page',
            component: () => import('./pages/Page/Index.vue'),
            name: 'antfusion.report',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
	]

    routes.forEach((route) => {
        router.addRoute(route)
    })
})

window.addEventListener('DOMContentLoaded', function () {
})
