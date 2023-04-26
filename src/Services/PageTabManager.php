<?php
namespace Addons\AntFusion\Services;

class PageTabManager {
    protected $tabs = [];

    protected $tabAttributes = [];

    public function registerTab($label, $componentName, $attributes = []) {
        $key = $label.'-'.$componentName;
        $this->tabs[$key] = [
            'label' => $label,
            'order' => count($this->tabs),
            'component' => $componentName,
        ];
        $this->tabAttributes[$key] = $attributes;
    }

    public function getTabs() {
        return collect($this->tabs)->sortBy('order')->map(function($tab, $key) {
            $attributes = is_callable($this->tabAttributes[$key]) ? call_user_func_array($this->tabAttributes[$key], []) : $this->tabAttributes[$key];
            return array_merge($tab, $attributes);
        });
    }
}