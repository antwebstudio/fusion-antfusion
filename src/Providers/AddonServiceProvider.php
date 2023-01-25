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
        if (!File::exists(public_path("addons/{$addonName}"))) {
            // Create symlink
            File::link(
                base_path("addons/{$addonName}/public"),
                public_path("addons/{$addonName}")
            );
        }
        \Fusion::asset('/addons/AntFusion/js/app.js');
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
