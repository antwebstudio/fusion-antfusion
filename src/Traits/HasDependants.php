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
        $this->processDependency($request, $formData, $request->has('attribute') ? [$request->attribute] : null);   
        return $this->toArrayWithoutDependant();
    }

    public function hasDependency()
    {
        return count($this->dependantCallback);
    }

    public function processDependency($request,  $formData = null, $attributes = null) {
        if ($this->hasDependency()) {
            $formData = $formData ?? json_decode(json_encode($request->form));
            $attributes = $attributes ?? array_keys($this->dependantCallback);
            
            foreach ($attributes as $attribute) {
                call_user_func_array($this->dependantCallback[$attribute], [$this, $request, $formData]);
            }
        }
        return $this;
    }
}