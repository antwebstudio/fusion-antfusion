<?php
namespace Addons\AntFusion\Traits;

trait HasComponents {
    public function components() {
        return [];
    }

    public function componentsArray() {
        $array = [];
        foreach ($this->components() as $index => $component) {
            $array[] = $component->setParent($this, $index, 'c')->toArray();
        }
        return $array;
    }
}