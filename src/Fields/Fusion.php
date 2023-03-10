<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;

class Fusion extends Field 
{
    protected $fieldType;
    protected $settings = [];

    public function __construct($label, $handle) {
        parent::__construct($label, $handle);
        $this->type($this->fieldType);
    }

    public static function makeFromField(\Fusion\Models\Field $field)
    {
        return static::make($field->name, $field->handle)
            // ->section($field->fieldable->placement)
            ->type($field->type)
            ->mergeSettings($field->settings);
    }

    public function handlePrefix($prefix) {
        $this->handle = $prefix.$this->handle;
        return $this;
    }

    public function asName() {
        return $this->setComponent('ui-title-group');
    }

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
        if (is_object($settings)) $settings = $settings->toArray();
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

    public function toArrayWithoutDependant() {
        return array_merge($this->meta, [
            'component' => $this->component,
            'id' => $this->id ?? $this->handle,
            'handle' => $this->handle,
            'field' =>[
                'name' => $this->label,
                'handle' => $this->handle,
                'settings' => $this->getSettings(),
                'required' => $this->hasRequiredRule(),
            ],
            'dependsOn' => $this->getDependsOnArray(),
            'path' => $this->getPath(),
        ]);
    }
}