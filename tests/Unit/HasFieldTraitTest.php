<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Addons\AntFusion\Field;
use Addons\AntFusion\Resource;
use Addons\AntFusion\Components\Panel;

class HasFieldTraitTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testFieldsRules()
    {
        $resource = new HasFieldTraitTestResource;

        $rules = $this->invokeMethod($resource, 'fieldsRules');

        $this->assertEquals(['test' => ['required']], $rules);
    }
}

class HasFieldTraitTestResource extends Resource
{
    public function fields()
    {
        return [
            Panel::make('', [
                HasFieldTraitTestField::make('Test', 'test')->rules('required'),
            ]),
        ];
    }
}

class HasFieldTraitTestField extends Field {
}