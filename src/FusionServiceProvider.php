<?php
namespace Addons\AntFusion;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class FusionServiceProvider extends ServiceProvider
{
    
    protected $models = [
    ];

	protected $fieldtypes = [
	];

    public function addons()
    {
        return [
        ];
    }
    
    public function resources() {
        return [
        ];
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }

    public function boot()
    {
        $this->bootFusionServiceProvider();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function bootFusionServiceProvider()
    {
		foreach ($this->fieldtypes as $fieldtype) {
			fieldtypes()->register($fieldtype);
		}
        
        foreach ($this->models as $from => $to) {
            if (class_exists($from) && class_exists($to)) {
                $this->app->bind($from, $to);
                
                $model = app($from);
                if (method_exists($model, 'morphTypeName')) {
                    Relation::morphMap([
                        $model->morphTypeName() => $to,
                    ]);
                }
            }
        }

        if (app_installed()) {
            // $this->app->booted(function ($app) {
                $this->loadAddons();
                $this->loadResources();
            // });
        }
    }

    protected function loadResources() {
        foreach ($this->resources() as $resource) {
            $resource->register();
        }
    }

    protected function loadAddons()
    {
        foreach ($this->addons() as $addon) {
            $addon = app($addon);
            $addon->boot();
            $addon->menu();
        }
    }
}