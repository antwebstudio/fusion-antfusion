<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Addons\AntFusion\Resource;
use Addons\AntFusion\Action;

class ResourceTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testGetDisplayableColumns()
    {
        $resource = new TestAntFusionResource;
        $this->assertEquals(['name', 'contact_number'], $resource->getDisplayableColumns());
    }

    public function testGetDisplayableColumns2()
    {
        $resource = new TestAntFusionResource2;
        $this->assertEquals(['name', 'contact_number'], $resource->getDisplayableColumns());
    }

    public function testGetDisplayableColumns3()
    {
        $resource = new TestAntFusionResource3;
        $this->assertEquals(['name', 'contact_number'], $resource->getDisplayableColumns());
    }

    public function testGetDisplayableColumns4()
    {
        $resource = new TestAntFusionResource5;
        $resource->getDisplayableColumns();

        $this->assertEquals(['id', 'name'], $resource->getDisplayableColumns());
    }

    public function testGetCustomColumnNames1()
    {
        $resource = new TestAntFusionResource5;
        $resource->getCustomColumnNames();

        $this->assertEquals(['name' => 'Test Name'], $resource->getCustomColumnNames());
    }

    public function testCreateMeta()
    {
        $resource = new TestAntFusionResource;
        $serialized = $resource->createMeta();
        
        $this->assertEquals('name', $serialized['fields'][0]['handle']);
        $this->assertEquals('contact_number', $serialized['fields'][1]['handle']);
    }

    public function testCreateMeta2()
    {
        $resource = new TestAntFusionResource2;
        $serialized = $resource->createMeta();
        
        $this->assertEquals('name', $serialized['children'][0]['fields'][0]['handle']);
        $this->assertEquals('contact_number', $serialized['children'][1]['fields'][0]['handle']);
    }

    public function testCreateMeta3()
    {
        $resource = new TestAntFusionResource3;
        $serialized = $resource->createMeta();
    }

    public function testGetDropDownActionsForRecord()
    {
        $user = \App\Models\User::factory()->create();
        $resource = new TestAntFusionResource4;
        $actions = $resource->getDropDownActionsForRecord($user);

        $this->assertCount(1, $actions);

        // dd($actions);
    }

    public function testGetNonDropDownActionsForRecord()
    {
        $user = \App\Models\User::factory()->create();
        $resource = new TestAntFusionResource4;
        $actions = $resource->getNonDropDownActionsForRecord($user);

        $this->assertCount(1, $actions);

        // dd($actions);
    }
}

class TestAntFusionResource extends Resource
{
    public function fields() 
    {
        return [
            \Addons\AntFusion\Fields\Fusion::make('Name', 'name')->type('input')->rules(['required']),
            \Addons\AntFusion\Fields\Fusion::make('Contact Number', 'contact_number')->type('input')->rules(['required']),
        ];
    }
}

class TestAntFusionResource2 extends Resource
{
    public function fields() 
    {
        return [
            \Addons\AntFusion\Components\Panel::make('Test1', [
                \Addons\AntFusion\Fields\Fusion::make('Name', 'name')->type('input')->rules(['required']),
            ]),
            \Addons\AntFusion\Components\Panel::make('Test2', [
                \Addons\AntFusion\Fields\Fusion::make('Contact Number', 'contact_number')->type('input')->rules(['required']),
            ]),
        ];
    }
}

class TestAntFusionResource3 extends Resource
{
    public function fields() 
    {
        return [
            \Addons\AntFusion\Components\Tabs::make()
                ->addTab('Tab1', [
                    \Addons\AntFusion\Components\Panel::make('Test1', [
                        \Addons\AntFusion\Fields\Fusion::make('Name', 'name')->type('input')->rules(['required']),
                    ]),
                    \Addons\AntFusion\Components\Panel::make('Test2', [
                        \Addons\AntFusion\Fields\Fusion::make('Contact Number', 'contact_number')->type('input')->rules(['required']),
                    ]),
                ]),
        ];
    }
}

class TestAntFusionResource4 extends Resource
{
    public function actions() 
    {
        return [
            (new TestAntFusionTestAction)->asDropdown(),
            (new TestAntFusionTestAction2)->standalone(),
            (new TestAntFusionTestAction3),
        ];
    }
}

class TestAntFusionResource5 extends Resource
{
    public function fields()
    {
        return [
            'id',
            ['name' => 'Test Name'],
        ];
    }
}

class TestAntFusionTestAction extends Action
{
    
}

class TestAntFusionTestAction2 extends Action
{
    
}

class TestAntFusionTestAction3 extends Action
{
    protected $dropdown = false;
}