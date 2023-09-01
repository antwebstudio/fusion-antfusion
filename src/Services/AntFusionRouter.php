<?php
namespace Addons\AntFusion\Services;

class AntFusionRouter {
    protected $routes = [];

    public function __construct() {

    }

    public function registerAdminRoute($path, $component, $params = []) {
        // Don't call $component->toRouteArray() here as when route is registered, most features of framework is not ready yet.
        // hence, calling $component->toRouteArray() will cause issue sometimes.
        // eg: one issue caused when one of the component registered called routes() and caused route not defined error.
        $this->routes[$path] = [
            'component' => $component,
            'params' => $params,
        ];
    }

    protected function processRoute($path, $component, $params = []) {
        if (!is_object($component)) {
            $component = class_exists($component) ? new $component : $component;
        }
        $route = is_object($component) ? $component->toRouteArray() : [
            'component' => $component,
        ];

        $route = array_merge($route, $params, [
            'path' => '/'.ltrim($path, '/'),
            'meta' => [
                'requiresAuth' => true,
                'layout' => 'admin',
            ],
        ]);
        return $route;
    }
    
    public function getAdminRoutes() {
        $routes = [];
        foreach ($this->routes as $path => $route) {
            $routes[$path] = $this->processRoute($path, $route['component'], $route['params']);
        }

        return collect($routes)->values();
    }
}