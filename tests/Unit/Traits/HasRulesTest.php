<?php

namespace Tests\Unit\AntFusion\Traits;

use Tests\TestCase;
use Addons\AntFusion\Field;
use Addons\AntFusion\Resource;
use Addons\AntFusion\Action;

class HasRulesTest extends TestCase
{
    public function test_rule_simple()
    {
        $model = new HasRulesTestModel;
        $model->rule('required');

        $this->assertEquals(['required'], $model->getRules());
    }

    public function test_rule_simple_multiple()
    {
        $model = new HasRulesTestModel;
        $model->rule('required|nullable');
        $model->rule('unique:users');

        request()->merge(['name' => 'test'])->validate(['name' => $model->getRules()]);

        $this->assertEquals(['required', 'nullable', 'unique:users'], $model->getRules());
    }

    public function test_rule_simple_multiple_closure()
    {
        $model = new HasRulesTestModel;
        $model->rule(function() {
            return 'required|nullable';
        });
        $model->rule(function() {
            return 'unique:users';
        });

        request()->merge(['name' => 'test'])->validate(['name' => $model->getRules()]);

        $this->assertEquals(['required', 'nullable', 'unique:users'], $model->getRules());
    }

    public function test_rule_simple_multiple_closure_with_array()
    {
        $model = new HasRulesTestModel;
        $model->rule(function() {
            return ['required', 'nullable'];
        });
        $model->rule(function() {
            return 'unique:users';
        });

        request()->merge(['name' => 'test'])->validate(['name' => $model->getRules()]);

        $this->assertEquals(['required', 'nullable', 'unique:users'], $model->getRules());
    }

    /**
     * rules()
     */

    public function test_rules()
    {
        $model = new HasRulesTestModel;
        $model->rules(['name' => 'required']);

        $this->assertEquals(['required'], $model->getRules());
    }

    public function test_rules_multiple()
    {
        $model = new HasRulesTestModel;
        $model->rules(['name' => 'required|nullable']);

        $this->assertEquals(['required', 'nullable'], $model->getRules());
    }

    public function test_rules_null()
    {
        $model = new HasRulesTestModel;
        $model->rules(null);

        $this->assertEquals([], $model->getRules());
    }
}

class HasRulesTestModel
{
    use \Addons\AntFusion\Traits\EvaluatesClosures;
    use \Addons\AntFusion\Traits\HasRules;
}