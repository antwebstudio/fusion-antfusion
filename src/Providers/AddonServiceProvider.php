<?php

namespace Addons\AntFusion\Providers;

use Fusion\Facades\Menu;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

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
        \Fusion::asset('/addons/AntFusion/app.umd.js');
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
