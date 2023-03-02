<?php
namespace Addons\AntFusion\Traits;

use Addons\AntFusion\Contracts\Panel;

trait HasFields {
    public function fields() {
        return [];
    }

    protected function convertFieldsToArray($fields, $scenario = null) {
        $fieldsArray = [];
        foreach ($fields as $field) {
            if (!is_string($field) && (!isset($scenario) || $field->shouldShowIn($scenario))) {
                $field->setParent($this);
                $fieldsArray[] = $field->setScenario($scenario)->toArray();
            }
        }
        return $fieldsArray;
    }

    protected function flatternFieldsArray($scenario = null) {
        return $this->convertFieldsToArray($this->resolveFields(), $scenario);
    }

    protected function fieldsArray($scenario = null) {
        return $this->convertFieldsToArray($this->fields(), $scenario);
    }

    public function resolveFields() {
        $fields = [];
        foreach ($this->fields() as $field) {
            if ($field instanceof Panel) {
                $fields = array_merge($fields, $field->resolveFields());
            } else {
                $fields[] = $field;
            }
        }
        return $fields;
    }

    protected function fieldsRules($scenario = null) {
        $rules = [];
        foreach ($this->resolveFields() as $field) {
            if (!is_string($field) && (!isset($scenario) || $field->shouldShowIn($scenario))) {
                $rules[$field->handle] = $field->setScenario($scenario)->getRules();
            }
        }
        return $rules;
    }

    public function getRules() {
        return $this->fieldsRules();
    }
}