<?php
namespace Addons\AntFusion\Components;

use JsonSerializable;
use Illuminate\Support\Str;
use Addons\AntFusion\Component;
use Addons\AntFusion\Components\Tabs;
use Illuminate\Support\Facades\Validator;
use Addons\AntFusion\Contracts\Panel;

class SimpleWizard extends Component implements Panel, JsonSerializable {
    use \Addons\AntFusion\Traits\HasFields;
    use \Addons\AntFusion\Traits\HasPath;
    
    protected $component = 'antfusion-simple-wizard';

    protected $steps = [];

    protected $fields = [];

    protected $errorMessages = [];

    public function steps($steps) {
        $this->steps = $steps;
        foreach ($this->steps as $fields) {
            $this->fields = array_merge($this->fields, $fields);
        }
        return $this;
    }

    public function mergeErrorMessages($messages) {
        $this->errorMessages = array_merge($this->errorMessages, $messages);
        return $this;
    }

    public function validateStep($step, $request) {
        return Validator::make($request->form, $this->getStepRules($step), $this->errorMessages)->validate();
    }

    protected function getStepRules($step, $scenario = null) {
        $rules = [];
        foreach ($this->steps[$step] as $field) {
            if (!is_string($field) && (!isset($scenario) || $field->shouldShowIn($scenario))) {
                if ($field instanceof Panel) {
                    $rules = array_merge($rules, $field->setScenario($scenario)->processDependency(request())->getRules());
                } else {
                    $rules[$field->handle] = $field->setScenario($scenario)->processDependency(request())->getRules();
                }
            }
        }
        return $rules;
    }

    public function saveStateExceptAndWhen($except, $whenCallback) {
        return $this->registerHook('preparing', function() use($except, $whenCallback) {
            if (call_user_func_array($whenCallback, [$this->scenario, $this])) {
                $this->saveStateExcept($except);
            }
        });
        return $this;
    } 

    public function saveStateExcept($except) {
        return $this->withMeta([
            'saveState' => true,
            'saveStateExcept' => $except,
        ]);
    }

    public function saveState()
    {
        return $this->saveStateExcept([]);
    }

    public function fields() {
        return $this->fields;
    }

    public function jsonSerialize() {
        return $this->toArray();
    }

    public function toArray() {
        $steps = [];
        $index = 0;
        foreach ($this->steps as $fields) {
            $step = [];
            foreach ($fields as $field) {
                $step[] = $field->setParent($this, $index++, 'f')->toArray();
            }
            $steps[] = [
                'children' => $step,
                // @TODO: rewrite to use convertFieldsToArray() method in HasFields trait.
                // 'children' => $this->convertFieldsToArray($fields),
            ];
        }

        return array_merge($this->meta, [
            'id' => $this->id,
            'validateUrl' => route('antfusion.wizard.validate'),
            'is_panel' => true,
            'component' => $this->component,
            'fields' => $this->flatternFieldsArray(),
            'as' => $this->component,
            'steps' => $steps,
            'path' => $this->getPath(),
            'footer' => [
                'class' => 'flex',
            ],
            'prevButton' => [
                'variant' => 'secondary',
                'text' => 'Prev',
            ],
            'nextButton' => [
                'variant' => 'primary',
                'class' => 'ml-auto',
                'text' => 'Next',
            ],
            'submitButton' => [
                'variant' => 'primary',
                'class' => 'ml-auto',
                'text' => 'Submit',
            ],
        ]);
    }
}