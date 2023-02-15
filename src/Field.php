<?php
namespace Addons\AntFusion;

use Illuminate\Support\Str;

class Field {
    use \Addons\AntFusion\Traits\HasMeta;
    use \Addons\AntFusion\Traits\ShowInTrait;
    use \Addons\AntFusion\Traits\CanSort;
    use \Addons\AntFusion\Traits\HasDependants;
    use \Addons\AntFusion\Traits\HasPath;
    use \Addons\AntFusion\Traits\HasParent;
    
    public $label;
    public $handle;

    protected $id;
    protected $component;
    protected $rules = [];
    protected $defaultValue;

    public function __construct($label, $handle) {
        $this->label = $label;
        $this->handle = $handle;
    }

    public function getHandle() {
        return $this->handle;
    }

    public function getSlug() {
        return Str::kebab($this->handle);
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
            'id' => $this->id ?? $this->handle,
            'name' => $this->label,
            'handle' => $this->handle,
            'field' => [
                'handle' => $this->handle,
            ],
            'default' => $this->defaultValue,
            'dependsOn' => $this->getDependsOnArray(),
            'path' => $this->getPath(),
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

    public function setId($id) {
        $this->id = $id;
        return $this;
    }
}