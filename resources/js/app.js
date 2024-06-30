import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import Fragment from 'vue-fragment'
import './fieldtypes-views'

window.Fusion.registerPage = function(router, path, componentName, props, meta, name) {
    if (!name) name = 'antfusion'
    const route ={ 
        path: path, 
        component: () => import('./components/AntFusionRouteView'),
        name: name,
        meta: {
            ... meta,
            component: componentName,
            componentProps: props,
        }
    }
    // console.log(route)
	router.addRoutes([route])
}

const loadComponents = function(Vue, requireComponent, namespace) {
    requireComponent.keys().forEach(fileName => {
        let componentConfig = requireComponent(fileName);
        let componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
        // Convert to kebab case
        componentName = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

        if (namespace) {
            componentName = namespace + '-' + componentName
        }

        Vue.component(componentName, componentConfig.default || componentConfig);
    });
}

window.Fusion.booting(function(Vue, router, store) {
    // loadComponents(Vue, require.context('./components', true, /\.vue$/))

    Vue.use(Fragment.Plugin)

    Vue.component('date-range-picker', DateRangePicker)
    Vue.component('antfusion-form', () => import('./components/AntFusionForm'))
    Vue.component('antfusion-datatable', () => import('./components/DataTable'))
    // Vue.component('antfusion-panel', () => import('./components/Panel'))
    Vue.component('panel-body', () => import('./components/PanelBody'))
    Vue.component('antfusion-edit-link', () => import('./components/EditResourceLink'))
    Vue.component('antfusion-page', () => import('./components/Page'))
    Vue.component('antfusion-repeater-fieldtype', () => import('./fieldtypes/Repeater/Field'))
    Vue.component('page-as-component', () => import('./components/PageAsComponent'))
    Vue.component('spinner', () => import('./components/Spinner'))
    Vue.component('parent-value', () => import('./components/ParentValue'))
    Vue.component('print-button', () => import('./components/PrintButton'))
    Vue.component('action-button', () => import('./components/ActionButton'))
    Vue.component('action-modal', () => import('./components/ActionModal'))
    Vue.component('action-dropdown-link', () => import('./components/ActionDropDownLink'))
    Vue.component('submit-button', () => import('./components/SubmitButton'))
    Vue.component('nested-component', () => import('./components/NestedComponent'))
    Vue.component('report-datatable', () => import('./components/ReportDataTable'))
    Vue.component('resource-datatable', () => import('./components/ResourceDataTable'))
    Vue.component('resource-datetime', () => import('./components/ResourceDateTime'))
    Vue.component('resource-date', () => import('./components/ResourceDate'))
    Vue.component('resource-fieldtype', () => import('./fieldtypes/Resource/Field'))
    Vue.component('resource-fieldtype-setting', () => import('./fieldtypes/Resource/Settings'))
    Vue.component('filter-tabs', () => import('./components/FilterTabs'))
    Vue.component('antfusion-simple-wizard', () => import('./components/SimpleWizard'))
    Vue.component('antfusion-html-table', () => import('./components/Table'))
    Vue.component('antfusion-html-table-header-row', () => import('./components/TableHeaderRow'))
    Vue.component('antfusion-html-table-row', () => import('./components/TableHeaderRow'))
    Vue.component('antfusion-html-table-cell', () => import('./components/TableCell'))
    Vue.component('antfusion-select', () => import('./components/Select'))
    Vue.component('metric-item', () => import('./components/MetricItem'))
    Vue.component('component-container', () => import('./components/ComponentContainer'))
    Vue.component('antfusion-thumbnail', () => import('./components/Thumbnail'))
    Vue.component('ajax-select-fieldtype', () => import('./fieldtypes/AjaxSelect/Field'))
    Vue.component('ajax-multiselect-fieldtype', () => import('./fieldtypes/AjaxSelect/Field'))
    Vue.component('antfusion-timer', () => import('./components/Timer'))
    Vue.component('bulk-edit', () => import('./components/BulkEdit'))
    
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
			path: '/resource/:resource/:id/view',
            component: () => import('./pages/Resource/View'),
            name: 'antfusion.resource.show',
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
