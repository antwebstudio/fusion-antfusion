<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;

class Repeater extends Field
{
    protected $component = 'antfusion-repeater-fieldtype';

    protected $fields = [];

    public function __construct($handle, $fields) {
        // $this->label = $label;
        $this->handle = $handle;

        $this->fields = $fields;

        $this->withMeta([
            // 'label' => 'Number of book copies',
            'fields' => [
                [
                    'name' => 'component-container',
                    'components' => collect($this->fields)->map(function($field) {
                        return $field->toArray();
                    }),
                ],
            ],
        ]);  
    }

    public function getRules($scenario = null, $record = null, &$rules = null)
    {
        foreach ($this->fields as $field) {
            $rules = array_merge($rules, [$this->getHandle().'.*.'.$field->getHandle() => $field->getRules($scenario, $record)]);
        }
        return $rules;
    }

    public function selectNumber($selectNumber = true)
    {
        return $this->withMeta([
            'selectNumber' => $selectNumber,
        ]);
    }

    // public function toArrayWithoutDependant() {
    //     return array_merge($this->meta, [
    //         'actions' => $this->actionsArray(),
    //         'component' => $this->component,
    //         'id' => $this->id ?? $this->handle,
    //         'name' => $this->label,
    //         'handle' => $this->getHandle(),
    //         'field' => [
    //             'name' => $this->label,
    //             'handle' => $this->getHandle(),
    //             'settings' => $this->getSettings(),
    //             'required' => $this->hasRequiredRule(),
    //         ],
    //         'default' => $this->defaultValue,
    //         'dependsOn' => $this->getDependsOnArray(),
    //         'path' => $this->getPath(),
    //     ]);
    // }
}