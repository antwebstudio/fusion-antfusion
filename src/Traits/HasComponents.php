<?php
namespace Addons\AntFusion\Traits;

trait HasComponents {
    public function components() {
        return [];
    }

    public function componentsArray() {
        $array = [];
        foreach ($this->components() as $component) {
            $array[] = $component->setParent($this)->toArray();
        }
        return $array;
    }
}