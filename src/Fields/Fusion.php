<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;
use Addons\AntLibrary\Rules\UserIdentity;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationRuleParser;

class Fusion extends Field 
{
    protected $fieldType = 'input';
    protected $settings = [];

    protected $indexComponent;
    protected $componentProps = [];

    public function __construct($label, $handle) {
        parent::__construct($label, $handle);
        $this->type($this->fieldType);
        $this->mergeSettings(['placeholder' => __($label)]);
    }

    public static function makeFromField(\Fusion\Models\Field $field)
    {
        return static::make($field->name, $field->handle)
            ->rules(static::getFieldRules($field))
            ->shouldPrint($field->should_print)
            ->dehydrateStateBeforeValidationUsing(function($state) use($field) {
                $fieldType = $field->type();
                if (method_exists($fieldType, 'onBeforeValidation')) {
                    return $fieldType->onBeforeValidation($state, $field);
                }
                return $state;
            })
            ->dehydrateStateUsing(function($state) use($field) {
                $fieldType = $field->type();
                if (method_exists($fieldType, 'onBeforeSave')) {
                    return $fieldType->onBeforeSave($state, $field);
                }
                return $state;
            })
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
        if (isset($this->fieldType)) {
			$this->component = str_replace('_', '-', $fieldType) . '-fieldtype';
        }
        return $this;
    }

    public function setComponent($component) {
        $this->fieldType = null;
        $this->component = $component;
        return $this;
    }

    public function setIndexComponent($component) {
        $this->indexComponent = $component;
        return $this;
    }

    public function getIndexComponent() {
        $indexComponent = [
            'datetime' => 'resource-datetime',
            'date' => 'resource-date',
        ];

        if (isset($this->indexComponent)) {
            return $this->indexComponent;
        } else if (isset($indexComponent[$this->fieldType])) {
            return $indexComponent[$this->fieldType];
        } else if (isset($this->fieldType)) {
            return $this->fieldType.'-fieldtype-index';
        } else if (isset($this->component)) {
            // Use setIndexComponent instead of setComponent
            // return $this->component;
        }
    }

    public function mergeComponentProps($array) {
        $this->componentProps = array_merge($this->componentProps, $array);
        return $this;
    }

    public function getComponentProps() {
        return $this->componentProps ?? [];
    }

    public function whenFilterActived($filter, $value) {
        $filterHandle = app($filter)->getHandle();
        return $this->mergeComponentProps(['show_in_filters' => ['name' => $filterHandle, 'value' => $value]]);
    }

    public function mergeSettings($settings) {
        if (is_object($settings)) $settings = $settings->toArray();
        $this->settings = array_merge($this->settings, $settings);
        return $this;
    }

    protected static function getFieldRules($field)
    {
        $rules = $field->type()->rules($field);
        $rules = (new ValidationRuleParser([]))->explode($rules)->rules;
        $rules = $rules[$field->handle] ?? [];

        $rules = collect($rules)->map(function($rule) {
            $parsed = ValidationRuleParser::parse($rule);
            if ($parsed[0] == 'Unique' || $parsed[0] instanceof UserIdentity) {
                return function($record) use($parsed) {
                    if (is_string($parsed[0])) {
                        $className = 'Illuminate\\Validation\\Rules\\'.$parsed[0];
                        $rule = new $className(...$parsed[1]);
                    } else {
                        $rule = $parsed[0];
                    }
                    if (method_exists($rule, 'withoutTrashed')) {
                        $rule->withoutTrashed();
                    }
                    if (isset($record)) {
                        $rule->ignore($record);
                        
                        // $rule->ignore(
                        //     $record->getOriginal($record->getKeyName()),
                        //     $record->getQualifiedKeyName()
                        // );
                    }
                    return $rule;
                };
            }
            return $rule;
        });

        return $rules;
    }

    protected function getSettings() {
        $defaultSettings = [
            'input' => [
                'placeholder' => __($this->label),
            ],
            'time' => [
                'format' => 'h:iK',
            ],
        ];

        return array_merge($defaultSettings[$this->fieldType] ?? [], $this->settings);
    }

    public function hideLabel()
    {
        $this->label = '';
        return $this;
    }

    public function toArrayWithoutDependant() {
        return array_merge($this->getMeta(), [
            'component' => $this->component,
            'id' => $this->id ?? $this->handle,
            'handle' => $this->handle,
            'field' =>[
                'name' => __($this->label),
                'handle' => $this->handle,
                'settings' => $this->getSettings(),
                'required' => $this->hasRequiredRule(),
            ],
            'dependsOn' => $this->getDependsOnArray(),
            'path' => $this->getPath(),
            'hide' => !$this->isVisible(),
        ]);
    }
}