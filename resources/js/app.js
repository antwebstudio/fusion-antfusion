import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

window.Fusion.booting(function(Vue, router, store) {
    Vue.component('date-range-picker', DateRangePicker)
    Vue.component('antfusion-form', () => import('./components/AntFusionForm'))
    Vue.component('antfusion-datatable', () => import('./components/DataTable'))
    // Vue.component('antfusion-panel', () => import('./components/Panel'))
    Vue.component('panel-body', () => import('./components/PanelBody'))
    Vue.component('antfusion-edit-link', () => import('./components/EditResourceLink'))
    Vue.component('page-as-component', () => import('./components/PageAsComponent'))
    Vue.component('spinner', () => import('./components/Spinner'))
    Vue.component('parent-value', () => import('./components/ParentValue'))
    Vue.component('print-button', () => import('./components/PrintButton'))
    Vue.component('action-button', () => import('./components/ActionButton'))
    Vue.component('action-dropdown-link', () => import('./components/ActionDropDownLink'))
    Vue.component('submit-button', () => import('./components/SubmitButton'))
    Vue.component('nested-component', () => import('./components/NestedComponent'))
    Vue.component('report-datatable', () => import('./components/ReportDataTable'))
    Vue.component('resource-datatable', () => import('./components/ResourceDataTable'))
    Vue.component('resource-datetime', () => import('./components/ResourceDateTime'))
    Vue.component('resource-fieldtype', () => import('./fieldtypes/Resource/Field'))
    Vue.component('resource-fieldtype-setting', () => import('./fieldtypes/Resource/Settings'))
    Vue.component('filter-tabs', () => import('./components/FilterTabs'))
    Vue.component('antfusion-simple-wizard', () => import('./components/SimpleWizard'))
    Vue.component('antfusion-html-table', () => import('./components/Table'))
    Vue.component('antfusion-html-table-header-row', () => import('./components/TableHeaderRow'))
    Vue.component('metric-item', () => import('./components/MetricItem'))
    Vue.component('component-container', () => import('./components/ComponentContainer'))

	router.addRoutes([
		{
			path: '/resource/:resource',
            component: () => import('./pages/Resource/Index'),
            name: 'antfusion.resource',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
		{
			path: '/resource/:resource/create',
            component: () => import('./pages/Resource/Create'),
            name: 'antfusion.resource.create',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
		{
			path: '/resource/:resource/:id/edit',
            component: () => import('./pages/Resource/Edit'),
            name: 'antfusion.resource.edit',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
		{
			path: '/report/:report', 
            component: () => import('./pages/Report/Index'),
            name: 'antfusion.report',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
		{
			path: '/page/:page',
            component: () => import('./pages/Page/Index'),
            name: 'antfusion.report',
            meta: {
                requiresAuth: true,
                layout: 'admin'
            }
		},
	])
})

window.addEventListener('DOMContentLoaded', function () {
})
