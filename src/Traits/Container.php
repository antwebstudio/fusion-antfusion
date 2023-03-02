<?php
namespace Addons\AntFusion\Traits;

trait Container {
    public function processDependency($request) {
        foreach ($this->resolveFields() as $field) {
            $field->processDependency($request);
        }
        return $this;
    }

    // public function getRules() {
    //     return $this->rules();
    // }
}