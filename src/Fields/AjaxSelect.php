<?php
namespace Addons\AntFusion\Fields;

class AjaxSelect extends Fusion
{
    use \Addons\AntFusion\Traits\HasActions;
    
    protected $component = 'ajax-select-fieldtype';

    protected $actions = [];

    public function __construct($label, $handle) {
        $this->label = $label;
        $this->handle = $handle;

        $this->mergeSettings([
            'multiple' => false,
            'track_by' => 'id',
            'label' => 'name',
            'query_min_length' => 1,
            'taggable' => false,
        ]);
    }

    public function labelAttribute($attribute)
    {
        return $this->mergeSettings([
            'label' => $attribute,
        ]);
    }

    public function multiple($multiple = true) {
        return $this->mergeSettings([
            'multiple' => $multiple,
        ]);
    }

    public function resource($resource) {
        $resource = is_object($resource) ? $resource : $resource::getInstance();
        return $this->mergeSettings([
            'endpoint' => $resource->getDataTableEndpoint(),
            'saved_data_endpoint' => route('antfusion.resource.find', ['resource' => $resource->getSlug()]),
        ]);
    }

    public function addAction($action)
    {
        $action->withMeta(['classes' => 'h-10 flex items-center justify-center w-full px-2 py-3 bg-gray-200 border-none outline-none focus:bg-gray-300']);
        $this->actions[] = $action->setParent($this);
        return $this;
    }

    public function actions() {
        return $this->actions;
    }

    public function getActionUrl($actionSlug) 
    {
        return $this->parent->getActionUrl($actionSlug);
    }

    public function toArrayWithoutDependant() {
        return array_merge($this->meta, [
            'actions' => $this->actionsArray(),
            'component' => $this->component,
            'id' => $this->id ?? $this->handle,
            'name' => $this->label,
            'handle' => $this->getHandle(),
            'field' => [
                'name' => $this->label,
                'handle' => $this->getHandle(),
                'settings' => $this->getSettings(),
                'required' => $this->hasRequiredRule(),
            ],
            'default' => $this->defaultValue,
            'dependsOn' => $this->getDependsOnArray(),
            'path' => $this->getPath(),
        ]);
    }
}