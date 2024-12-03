<?php

namespace Addons\AntFusion\Providers;

use Fusion\Facades\Menu;
use Illuminate\Support\Str;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Addons\AntFusion\Services\AntFusionRouter;

class AddonServiceProvider extends ServiceProvider
{
    protected $navigation = [
    ];

    /**
     * Register any addon services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(RouteServiceProvider::class);
        $this->app->register(EventServiceProvider::class);

        $this->app->singleton('antfusion-router', function() {
            return new AntFusionRouter;
        });
        
        Router::macro('antfusionAdmin', function($uri, $component, $props = []) {
            $router = app('antfusion-router');
            $route = $router->registerAdminRoute($uri, $component, $props);
            (new $component)->boot();
            return $route;
        });

        Router::macro('antfusion', function($uri, $component, $props = []) {
            $router = app('antfusion-router');
            $route = $router->registerRoute($uri, $component, $props);
            (new $component)->boot();
            return $route;
        });

        View::addNamespace('antfusion', dirname(dirname(__DIR__)).'/resources/views');
        Blade::component('antfusion-form', \Addons\AntFusion\BladeComponents\FullForm::class);
    }

    /**
     * Bootstrap any addon services.
     *
     * @return void
     */
    public function boot()
    {
        $this->bootAdminMenu();
        
        $addonName = 'AntFusion';
        $basePath = dirname(dirname(dirname(__FILE__)));

        if (!File::isDirectory(public_path("addons"))) {
            File::makeDirectory(public_path("addons"));
        }
        if (!File::exists(public_path("addons/{$addonName}"))) {
            // Create symlink
            File::link(
                "{$basePath}/public",
                public_path("addons/{$addonName}")
            );
        }
        \Fusion::asset(mix('css/prime-vue.css', 'addons/AntFusion')->toHtml());
        \Fusion::asset(mix('js/app.js', 'addons/AntFusion')->toHtml());
        \Fusion::asset(url('antfusion-admin-routes.js'));

        fieldtypes()->register(\Addons\AntFusion\Fieldtypes\AjaxSelect::class);
    }

    protected function resourcesIn($path) {
        return [
            'test' => \Addons\AntFusion\Test\TestAntFusionResouces::class,
        ];
    }

    protected function bootAdminMenu()
    {
        $slug = 'ant-fusion';
    }
}
