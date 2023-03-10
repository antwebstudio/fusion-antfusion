<?php
namespace Addons\AntFusion\Traits;

use Illuminate\Support\Str;

trait HasPath {
    protected $componentsBySlug = [];

    public function getPathSlug() {
        return $this->id ?? $this->getSlug();
    }

    public function getPath() {
        if (isset($this->parent)) {
            return $this->parent->getPath().'.'.$this->getPathSlug();
        }
        return $this->getPathSlug();
    }

    public function getComponentByPath($path) {
        if (Str::contains($path, '.')) {
            $slug = Str::before($path, '.');
            $pathAfterThat = Str::after($path, '.');
            return $this->getComponentBySlug($slug)->getComponentByPath($pathAfterThat);
        } else {
            return $this->getComponentBySlug($path);
        }
    }

    public function getComponentBySlug($slug) {
        if (method_exists($this, 'fields')) {
            $components = $this->fields();
        } else if (method_exists($this, 'components')) {
            $components = $this->components();
        } else {
            throw new \Exception('Component do not have any children.');
        }

        
        if (!isset($this->componentsBySlug[$slug])) {
            foreach ($components as $component) {
                $component->setParent($this);
                $this->componentsBySlug[$component->getPathSlug()] = $component;
            }
        }
        if (isset($this->componentsBySlug[$slug])) {
            return $this->componentsBySlug[$slug];
        } else {
            throw new \Exception(get_class($this).' do not have component with handle: '.$slug);
        }
    }
}