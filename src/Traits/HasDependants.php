<?php
namespace Addons\AntFusion\Traits;

trait HasDependants {
    protected $dependantCallback = [];

    public function dependsOn($attributes, $callback) {
        $attributes = is_array($attributes) ? $attributes : [$attributes];
        foreach ($attributes as $attribute) {
            $this->dependantCallback[$attribute] = $callback;
        }
        return $this;
    }

    protected function getDependsOnArray() {
        $dependsOn = [];
        foreach ($this->dependantCallback as $attribute => $callback) {
            $dependsOn[] = $attribute;
        }
        return count($dependsOn) ? $dependsOn : null;
    }

    public function toArrayWithDependant($request) {
        $formData = json_decode(json_encode([
            $request->attribute => $request->form[$request->attribute] ?? null
        ]));
        call_user_func_array($this->dependantCallback[$request->attribute], [$this, $request, $formData]);
        return $this->toArrayWithoutDependant();
    }
}