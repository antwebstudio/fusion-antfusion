<?php
namespace Addons\AntFusion\Services;

class PageTabManager {
    protected $tabs = [];

    protected $tabAttributes = [];

    public function registerTab($label, $component, $attributes = []) {
        if (is_callable($component)) {
            $component = call_user_func_array($component, []);
            $key = $label.'-'.get_class($component);
        } else {
            $key = $label.'-'.$component;
        }
        $this->tabs[$key] = [
            'label' => $label,
            'order' => count($this->tabs),
            'component' => $component,
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