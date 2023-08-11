<?php
namespace Addons\AntFusion\Services;

class AntFusionRouter {
    protected $routes = [];

    public function __construct() {

    }

    public function registerAdminRoute($path, $component, $params = []) {
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
        
        $this->routes[$path] = $route;
    }
    
    public function getAdminRoutes() {
        return collect($this->routes)->values();
    }
}