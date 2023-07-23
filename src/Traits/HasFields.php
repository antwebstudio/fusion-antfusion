<?php
namespace Addons\AntFusion\Traits;

use Addons\AntFusion\Contracts\Panel;

trait HasFields {
    public function fields() {
        return [];
    }

    protected function convertFieldsToArray($fields, $scenario = null, $flattern = false) {
        return $this->_convertFieldsToArray($this->_resolveFields($fields, $flattern), $scenario);
    }

    protected function _convertFieldsToArray($fields, $scenario = null) {
        $fieldsArray = [];
        foreach ($fields as $field) {
            if ($this->shouldShowField($field, $scenario)) {
                $fieldsArray[] = $field->setScenario($scenario)->toArray();
            }
        }
        return $fieldsArray;
    }

    protected function flatternFieldsArray($scenario = null) {
        return $this->_convertFieldsToArray($this->resolveFields(true), $scenario);
    }

    protected function fieldsArray($scenario = null) {
        return $this->_convertFieldsToArray($this->resolveFields(false), $scenario);
    }

    public function resolveFields($flattern = false) 
    {
        return $this->_resolveFields($this->fields(), $flattern);
    }

    public function _resolveFields($fields, $flattern = false) {
        $resolvedFields = [];
        foreach ($fields as $index => $field) {
            if (is_object($field)) {
                $field->setParent($this, $index, 'f');
            }
            if ($field instanceof Panel && $flattern) {
                $resolvedFields = array_merge($resolvedFields, $field->resolveFields(true));
            } else {
                $resolvedFields[] = $field;
            }
        }
        return $resolvedFields;
    }

    protected function fieldsRules($scenario = null) {
        $rules = [];
        foreach ($this->resolveFields(true) as $field) {
            if ($this->shouldShowField($field, $scenario)) {
                $rules[$field->handle] = $field->setScenario($scenario)->getRules();
            }
        }
        return $rules;
    }

    public function getRules() {
        return $this->fieldsRules();
    }

    protected function shouldShowField($field, $scenario) {
        return !$field->isHidden() && (is_object($field) && (!isset($scenario) || $field->shouldShowIn($scenario)));
    }
}