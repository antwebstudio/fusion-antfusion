<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;

class Fusion extends Field 
{
    protected $fieldType;
    protected $settings = [];

    public function type($fieldType) {
        $this->fieldType = $fieldType;
        $this->component = $fieldType.'-fieldtype';
        return $this;
    }

    public function setComponent($component) {
        $this->fieldType = null;
        $this->component = $component;
        return $this;
    }

    public function getIndexComponent() {
        $indexComponent = [
            'datetime' => 'resource-datetime',
        ];
        return $indexComponent[$this->fieldType] ?? null;
    }

    public function mergeSettings($settings) {
        $this->settings = array_merge($this->settings, $settings);
        return $this;
    }

    protected function getSettings() {
        $defaultSettings = [
            'input' => [
                'placeholder' => $this->label,
            ],
            'time' => [
                'format' => 'h:iK',
            ],
        ];

        return array_merge($defaultSettings[$this->fieldType] ?? [], $this->settings);
    }

    public function toArray() {
        return [
            'component' => $this->component,
            'handle' => $this->handle,
            'field' =>[
                'name' => $this->label,
                'handle' => $this->handle,
                'settings' => $this->getSettings(),
                'required' => $this->hasRequiredRule(),
            ],
        ];
    }
}