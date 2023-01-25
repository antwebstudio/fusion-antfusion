<?php
namespace Addons\AntFusion\Traits;

trait HasComponents {
    public function components() {
        return [];
    }

    public function componentsArray() {
        $array = [];
        foreach ($this->components() as $component) {
            $array[] = $component->toArray();
        }
        return $array;
    }
}