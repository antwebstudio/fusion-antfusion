<?php
namespace Addons\AntFusion\Services;

class AntFusionRoute {
    protected $component;
    protected $name;
    protected $path;
    protected $params;

    public function component($component) {
        $this->component = $component;
        return $this;
    }

    public function name($name) {
        $this->name = $name;
        return $this;
    }

    public function path($path) {
        $this->path = $path;
        return $this;
    }

    public function params($params) {
        $this->params = $params;
        return $this;
    }

    public function processRoute() {
        if (!is_object($this->component)) {
            $this->component = class_exists($this->component) ? new $this->component : $this->component;
        }
        $route = is_object($this->component) ? $this->component->toRouteArray() : [
            'component' => $this->component,
        ];

        $route = array_merge($route, $this->params, [
            'name' => $this->name,
            'path' => '/'.ltrim($this->path, '/'),
            'meta' => array_merge($route['meta'] ?? [], [
                'requiresAuth' => true,
                'layout' => 'admin',
            ]),
        ]);
        return $route;
    }
}