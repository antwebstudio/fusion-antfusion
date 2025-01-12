<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;

class Select extends Field
{
    use \Addons\AntFusion\Traits\HasActions;

    protected $component = 'antfusion-select';

    protected $actions = [];

    public function addAction($action)
    {
        $action->withMeta(['classes' => 'h-10 flex items-center justify-center w-full px-2 py-3 bg-gray-200 border-none outline-none focus:bg-gray-300']);
        $this->actions[] = $action->setParent($this);
        return $this;
    }

    public function actions() {
        return $this->actions;
    }

    public function toArrayWithoutDependant() {
        return array_merge($this->meta, [
            'actions' => $this->actionsArray(),
            'component' => $this->component,
            'id' => $this->id ?? $this->handle,
            'name' => $this->getLabel(),
            'label' => $this->getLabel(),
            'handle' => $this->handle,
            'field' => [
                'name' => $this->getLabel(),
                'handle' => $this->getHandle(),
            ],
            'default' => $this->defaultValue,
            'dependsOn' => $this->getDependsOnArray(),
            'path' => $this->getPath(),
        ]);
    }

    public function options($options, $keyValuePair = true) 
    {
        if ($keyValuePair) {
            $options = collect($options)->map(function($label, $value) {
                return [
                    'value' => $value,
                    'label' => (string) $label,
                ];
            })->values()->toArray();
        }
        return $this->withMeta(['options' => $options]);
    }

    public function getActionUrl($actionSlug) 
    {
        return $this->parent->getActionUrl($actionSlug);
    }

    public function getIndexComponent()
    {
        return '';
    }
}