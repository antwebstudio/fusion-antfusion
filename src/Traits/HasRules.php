<?php

namespace Addons\AntFusion\Traits;

use Illuminate\Support\Str;
use Illuminate\Validation\ValidationRuleParser;

trait HasRules
{
    protected $rules = [];

    public function getRules($scenario = null, $record = null) {
        $rules = $this->evaluate($this->rules, ['record' => $record]);
        $rules = collect($rules)->reduce(function($rules, $rule) use($record) {
            $rule = $this->evaluate($rule, ['record' => $record]);

            if (is_object($rule)) {
                $rule = [$rule];
            } else if (is_array($rule)) {
                $rule = $rule;
            } else {
                $rule = explode('|', $rule);
            }
            return array_merge($rules ?? [], $rule);
        });
        
        return $rules ?? [];
    }

    public function rule($rule)
    {
        $this->rules[] = $rule;
        return $this;
    }

    public function rules($rules) {
        $this->rules = $rules;
        return $this;
    }

    public function unique($table, $ignoreRecord = false)
    {
        $table = (new $table)->getTable();
        return $this->rule(function($record) use($table, $ignoreRecord) {
            $rule = \Illuminate\Validation\Rule::unique($table);
            if ($ignoreRecord && isset($record)) {
                $rule->ignore($record->id);
            }
            return [$rule];
        });
    }
}
