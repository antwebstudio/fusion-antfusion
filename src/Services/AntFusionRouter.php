<?php
namespace Addons\AntFusion\Services;

use Illuminate\Support\Facades\Route;

class AntFusionRouter extends \Illuminate\Routing\Router {
    protected $adminRoutes = [];
    protected $routes = [];

    public function __construct() {

    }

    public function registerRoute($path, $component, $params = []) {
        Route::get($path, [\Addons\AntFusion\Http\Controllers\Web\PageController::class, 'index'])
            ->defaults('component', $component);

        $route = (new AntFusionRoute)->path($path)->component($component)->params($params);
        $this->routes[$path] = $route;
        return $route;
    }

    public function registerAdminRoute($path, $component, $params = []) {
        // Don't call $component->toRouteArray() here as when route is registered, most features of framework is not ready yet.
        // hence, calling $component->toRouteArray() will cause issue sometimes.
        // eg: one issue caused when one of the component registered called routes() and caused route not defined error.
        $route = (new AntFusionRoute)->path($path)->component($component)->params($params);
        $this->adminRoutes[$path] = $route;
        return $route;
    }

    public function getRoutes() {
        $routes = [];
        foreach ($this->routes as $path => $route) {
            $routes[$path] = $route->processRoute();
        }

        return collect($routes)->values();
    }
    
    public function getAdminRoutes() {
        $routes = [];
        foreach ($this->adminRoutes as $path => $route) {
            $routes[$path] = $route->processRoute();
        }

        return collect($routes)->values();
    }
}