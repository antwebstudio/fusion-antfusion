<?php
namespace Addons\AntFusion;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class Field {
    use \Addons\AntFusion\Traits\HasMeta;
    use \Addons\AntFusion\Traits\ShowInTrait;
    use \Addons\AntFusion\Traits\CanSort;
    use \Addons\AntFusion\Traits\CanSearch;
    use \Addons\AntFusion\Traits\HasDependants;
    use \Addons\AntFusion\Traits\HasPath;
    use \Addons\AntFusion\Traits\HasParent;
    use \Addons\AntFusion\Traits\HasHooks;
    use \Addons\AntFusion\Traits\HasScenario;
    use \Addons\AntFusion\Traits\HasRules;
    use \Addons\AntFusion\Traits\HasRecords;
    use \Addons\AntFusion\Traits\EvaluatesClosures;
    
    public $label;
    public $handle;
    protected $slug;

    protected $id;
    protected $component;
    protected $defaultValue;
    protected $getRecordUsing;
    protected $getStateUsing;
    protected $dehydrateStateUsing;
    protected $dehydrateStateBeforeValidationUsing;

    protected $_toArrayWithoutDependency;
    protected $_toArray;

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

    public function label($label)
    {
        $this->label = $label;
        return $this;
    }

    public function default($defaultValue) {
        $this->defaultValue = $defaultValue;
        return $this;
    }

    public function debug($debug = true)
    {
        return $this->withMeta(['debug' => $debug]);
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
            if (!isset($this->_toArray)) {
                $this->_toArray = $this->toArrayWithDependant($request);
            }
            return $this->_toArray;
        } else {
            if (!isset($this->_toArrayWithoutDependency)) {
                $this->_toArrayWithoutDependency = $this->toArrayWithoutDependant($request);
            }
            return $this->_toArrayWithoutDependency;
        }
    }

    protected function beforeToArray()
    {

    }

    public function toArrayWithoutDependant() {
        $this->beforeToArray();

        return array_merge($this->getMeta(), [
            'component' => $this->component,
            'id' => $this->id ?? $this->handle,
            'name' => __($this->label),
            'handle' => $this->getHandle(),
            'field' => [
                'handle' => $this->getHandle(),
            ],
            'default' => $this->defaultValue,
            'dependsOn' => $this->getDependsOnArray(),
            'path' => $this->getPath(),
            'hide' => !$this->isVisible(),
        ]);
    }

    protected function hasRequiredRule() {
        $rules = $this->getRules();
        return in_array('required', $rules ?? []);
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

    public function getState($record, $handle)
    {
        $state = Arr::get($record, $handle);
        if (isset($this->getStateUsing)) {
            $state = $this->evaluate($this->getStateUsing, ['state' => $state, 'record' => $record]);
        }
        return $state;
    }

    public function processDataTableRecord($record) {
        if (isset($this->getRecordUsing)) {
            $record = $this->evaluate($this->getRecordUsing, ['record' => $record]);
        }
        $data = is_object($record) ? $record->attributesToArray() : $record;

        if (isset($this->getStateUsing)) {
            $state = $this->evaluate($this->getStateUsing, ['state' => $record[$this->getHandle()] ?? null, 'record' => $record]);
            $data[$this->getHandle()] = $state;
        }
        return $data;
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

    public function dehydrateStateUsing($closure)
    {
        $this->dehydrateStateUsing = $closure;
        return $this;
    }

    public function dehydrateState($state)
    {
        if (isset($this->dehydrateStateUsing)) {
            return $this->evaluate($this->dehydrateStateUsing, ['state' => $state]);
        }
        return $state;
    }

    public function dehydrateStateBeforeValidationUsing($closure)
    {
        $this->dehydrateStateBeforeValidationUsing = $closure;
        return $this;
    }

    public function dehydrateStateBeforeValidation($state)
    {
        if (isset($this->dehydrateStateBeforeValidationUsing)) {
            return $this->evaluate($this->dehydrateStateBeforeValidationUsing, ['state' => $state]);
        }
        return $state;
    }
}