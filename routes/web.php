<?php

Route::get('antfusion-admin-routes.js', function() {
    try {
        $debugbar = app('debugbar');
        if (isset($debugbar)) $debugbar->disable();
    } catch (\Illuminate\Contracts\Container\BindingResolutionException $ex) {
    }

    return '
        window.Fusion.booting(function(Vue, router, store) {
            let pages = '.json_encode(app('antfusion-router')->getAdminRoutes()).'
            '.(config('app.debug') ? 'console.log("pages", pages)' : '').'
            pages.forEach((page) => {
                window.Fusion.registerPage(router, page.path, page.component, page.props, page.meta, page.name)
            })
        })
    ';
});

Route::get('antfusion-routes.js', function() {
    try {
        $debugbar = app('debugbar');
        if (isset($debugbar)) $debugbar->disable();
    } catch (\Illuminate\Contracts\Container\BindingResolutionException $ex) {
    }

    return '
        window.Fusion.booting(function(Vue, router, store) {
            let pages = '.json_encode(app('antfusion-router')->getRoutes()).'
            '.(config('app.debug') ? 'console.log("pages", pages)' : '').'
            pages.forEach((page) => {
                window.Fusion.registerPage(router, page.path, page.component, page.props, page.meta, page.name)
            })
        })
    ';
});