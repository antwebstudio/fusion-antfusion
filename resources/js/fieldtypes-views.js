window.Fusion.booting(function(Vue, router, store) {
    Vue.component('asset-fieldtype-view', () => import('./fieldtypes/Asset/View'))
    Vue.component('matrix-fieldtype-view', () => import('./fieldtypes/Matrix/View'))
})