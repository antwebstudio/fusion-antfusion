<?php
namespace Addons\AntFusion\Services;

class AntFusionRouter extends \Illuminate\Routing\Router {
    protected $routes = [];

    public function __construct() {

    }

    public function registerAdminRoute($path, $component, $params = []) {
        // Don't call $component->toRouteArray() here as when route is registered, most features of framework is not ready yet.
        // hence, calling $component->toRouteArray() will cause issue sometimes.
        // eg: one issue caused when one of the component registered called routes() and caused route not defined error.
        $route = (new AntFusionRoute)->path($path)->component($component)->params($params);
        $this->routes[$path] = $route;
        return $route;
    }
    
    public function getAdminRoutes() {
        $routes = [];
        foreach ($this->routes as $path => $route) {
            $routes[$path] = $route->processRoute();
        }

        return collect($routes)->values();
    }
}