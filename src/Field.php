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
    use \Addons\AntFusion\Traits\HasHooks;
    use \Addons\AntFusion\Traits\HasScenario;
    
    public $label;
    public $handle;
    protected $slug;

    protected $id;
    protected $component;
    protected $rules = [];
    protected $defaultValue;
    protected $getRecordUsing;
    protected $getStateUsing;

    public function __construct($label, $handle) {
        $this->label = $label;
        $this->handle = $handle;
    }

    public function getLabel() {
        return $this->label;
    }

    public function getHandle() {
        return $this->handle;
    }

    public function getSlug() {
        return $this->slug ?? Str::kebab($this->handle);
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
        $request = request();
        if (isset($request)) {
            return $this->toArrayWithDependant($request);
        } else {
            return $this->toArrayWithoutDependant($request);
        }
    }

    protected function beforeToArray()
    {

    }

    public function toArrayWithoutDependant() {
        $this->beforeToArray();

        return array_merge($this->meta, [
            'component' => $this->component,
            'id' => $this->id ?? $this->handle,
            'name' => __($this->label),
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

    public function getComponentProps() {
        return [];
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

    public function getRecordUsing($callback) {
        $this->getRecordUsing = $callback;
        return $this;
    }

    public function getStateUsing($callback) {
        $this->getStateUsing = $callback;
        return $this;
    }

    public function processDataTableRecord($record) {
        if (isset($this->getRecordUsing)) {
            return call_user_func_array($this->getRecordUsing, [$record]);
        } else if (isset($this->getStateUsing)) {
            $record[$this->handle] = call_user_func_array($this->getStateUsing, [$record]);
        }
        return $record;
    }

    public function whenFilterActived($filter, $value) {
        $filterHandle = app($filter)->getHandle();
        $value = is_array($value) ? $value : [$value];
        if (in_array(request()->filter[$filterHandle] ?? null, $value)) {
            $this->show();
        } else {
            $this->hide();
        }
        return $this;
    }
}