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

    public function steps($steps) {
        $this->steps = $steps;
        foreach ($this->steps as $fields) {
            $this->fields = array_merge($this->fields, $fields);
        }
        return $this;
    }

    public function validateStep($step, $request) {
        return Validator::make($request->form, $this->getStepRules($step))->validate();
    }

    protected function getStepRules($step, $scenario = null) {
        $rules = [];
        foreach ($this->steps[$step] as $field) {
            if (!is_string($field) && (!isset($scenario) || $field->shouldShowIn($scenario))) {
                if ($field instanceof Panel) {
                    $rules = array_merge($rules, $field->setScenario($scenario)->rules());
                } else {
                    $rules[$field->handle] = $field->setScenario($scenario)->getRules();
                }
            }
        }
        return $rules;
    }

    public function fields() {
        return $this->fields;
    }

    public function jsonSerialize() {
        return $this->toArray();
    }

    public function toArray() {
        $steps = [];
        foreach ($this->steps as $fields) {
            $step = [];
            foreach ($fields as $field) {
                $step[] = $field->setParent($this)->toArray();
            }
            $steps[] = [
                'children' => $step,
            ];
        }

        return [
            'validateUrl' => route('antfusion.wizard.validate'),
            'is_panel' => true,
            'component' => $this->component,
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
        ];
    }
}