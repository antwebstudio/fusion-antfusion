<?php
namespace Addons\AntFusion\Traits;

use Illuminate\Support\Str;
use Addons\AntFusion\Components\Panel;

trait HasPath {
    protected $componentsBySlug = [];

    public function getPathSlug() {
        $slug = isset($this->indexInParent) ? $this->getSlug().'_'.$this->indexInParent : $this->getSlug();
        return $this->id ?? $slug;
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
            $component = $this->getComponentBySlugFrom($slug, $this->fields(), 'f');
            if (isset($component)) return $component;
        }
        
        if (method_exists($this, 'components')) {
            $component = $this->getComponentBySlugFrom($slug, $this->components(), 'c');
            if (isset($component)) return $component;
        }
        
        if (method_exists($this, 'actions')) {
            $component = $this->getComponentBySlugFrom($slug, $this->actions(), 'a');
            if (isset($component)) return $component;
        }
        
        if (method_exists($this, 'getFooterActions')) {
            $component = $this->getComponentBySlugFrom($slug, $this->getFooterActions(), 'a');
            if (isset($component)) return $component;
        }
        
        throw new \Exception(get_class($this).' do not have children with handle: '.$slug);
    }

    public function getComponentBySlugFrom($slug, $components, $indexPrefix = '') {
        if (!isset($this->componentsBySlug[$slug])) {
            foreach ($components as $index => $component) {
                if (is_object($component)) {
                    $component->setParent($this, $index, $indexPrefix);
                    $this->componentsBySlug[$component->getPathSlug()] = $component;
                }
            }
        }
        if (isset($this->componentsBySlug[$slug])) {
            return $this->componentsBySlug[$slug];
        }
    }
}