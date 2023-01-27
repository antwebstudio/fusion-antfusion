<?php
namespace Addons\AntFusion;

class Field {
    use \Addons\AntFusion\Traits\HasMeta;
    use \Addons\AntFusion\Traits\ShowInTrait;
    use \Addons\AntFusion\Traits\CanSort;
    
    public $label;
    public $handle;

    protected $component;
    protected $rules = [];
    protected $defaultValue;

    public function __construct($label, $handle) {
        $this->label = $label;
        $this->handle = $handle;
    }

    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    public function rules($rules) {
        $this->rules = $rules;
        return $this;
    }

    public function getRules() {
        return $this->rules;
    }

    public function default($defaultValue) {
        $this->defaultValue = $defaultValue;
        return $this;
    }

    public function exceptOnForms() {
        foreach ($this->formViews as $scenario) {
            $this->exceptShowIn($scenario);
        }
        return $this;
    }

    public function toArray() {
        return array_merge($this->meta, [
            'component' => $this->component,
            'name' => $this->label,
            'handle' => $this->handle,
            'field' => [
                'handle' => $this->handle,
            ],
            'default' => $this->defaultValue,
        ]);
    }

    protected function hasRequiredRule() {
        $rules = $this->getRules();
        return in_array('required', $rules);
    }
    
    public function getIndexComponent() {
        return $this->component;
    }

    public function hideFromIndex() {
        return $this->exceptShowIn('index');
    }

    public function section($sectionName) {
        return $this->withMeta(['section' => $sectionName]);
    }
}