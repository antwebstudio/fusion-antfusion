<?php
namespace Addons\AntFusion\Services;

use Addons\AntFusion\Resource;

class PageTabManager
{
    protected $tabs = [];

    protected $tabAttributes = [];

    public function registerTab($label, $component, $attributes = [])
    {
        if ($component instanceof Resource) {
            $key = $label . '-' . get_class($component);
        } else if (is_callable($component)) {
            $key = $label . '-' . uniqid();
        } else {
            $key = $label . '-' . $component;
        }
        $this->tabs[$key] = [
            'label' => $label,
            'order' => count($this->tabs),
            'component' => $component,
        ];
        $this->tabAttributes[$key] = $attributes;
    }
    public function getTabs($params = [])
    {
        return collect($this->tabs)->sortBy('order')->map(function ($tab, $key) use($params) {
            $component = is_callable($tab['component']) ? call_user_func_array($tab['component'], [$params]) : $tab['component'];

            if ($component instanceof Resource) {
                $componentAttributes = $component->toArray()['components'][0];
                $tab['component'] = $componentAttributes['is'];
            } else {
                $tab['component'] = $component;
            }
            
            $attributes = is_callable($this->tabAttributes[$key]) ? call_user_func_array($this->tabAttributes[$key], []) : $this->tabAttributes[$key];
            $attributes = array_merge($componentAttributes ?? [], $attributes);
            return array_merge($tab, $attributes ?? []);
        });
    }
}