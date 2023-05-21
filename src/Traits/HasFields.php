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
            if (is_object($field) && (!isset($scenario) || $field->shouldShowIn($scenario))) {
                $fieldsArray[] = $field->setScenario($scenario)->toArray();
            }
        }
        return $fieldsArray;
    }

    protected function flatternFieldsArray($scenario = null) {
        return $this->convertFieldsToArray($this->resolveFields(true), $scenario);
    }

    protected function fieldsArray($scenario = null) {
        return $this->convertFieldsToArray($this->resolveFields(false), $scenario);
    }

    public function resolveFields($flattern = false) {
        $fields = [];
        foreach ($this->fields() as $index => $field) {
            if (is_object($field)) {
                $field->setParent($this, $index, 'f');
            }
            if ($field instanceof Panel && $flattern) {
                $fields = array_merge($fields, $field->resolveFields(true));
            } else {
                $fields[] = $field;
            }
        }
        return $fields;
    }

    protected function fieldsRules($scenario = null) {
        $rules = [];
        foreach ($this->resolveFields(true) as $field) {
            if (is_object($field) && (!isset($scenario) || $field->shouldShowIn($scenario))) {
                $rules[$field->handle] = $field->setScenario($scenario)->getRules();
            }
        }
        return $rules;
    }

    public function getRules() {
        return $this->fieldsRules();
    }
}