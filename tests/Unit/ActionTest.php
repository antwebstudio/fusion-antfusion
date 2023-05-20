<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Addons\AntFusion\Field;
use App\AntFusion\Resource;
use Addons\AntFusion\Action;

class ActionTest extends TestCase
{
    public function testGetComponentForActionWithoutAction()
    {
        $action = new TestAntFusionActionTestAction;

        // Default case
        $this->assertFalse($action->isDropdown());
        $this->assertFalse($action->isStandalone());
        $this->assertEquals('ui-button', $this->invokeMethod($action, 'getComponent'));
        
        // Standalone
        $action = (new TestAntFusionActionTestAction)->standalone();
        $this->assertTrue($action->isStandalone());
        $this->assertFalse($action->isDropdown());
        $this->assertEquals('ui-button', $this->invokeMethod($action, 'getComponent'));

        // Dropdown
        $action = (new TestAntFusionActionTestAction)->asDropdown();
        $this->assertFalse($action->isStandalone());
        $this->assertTrue($action->isDropdown());
        $this->assertEquals('action-dropdown-link', $this->invokeMethod($action, 'getComponent'));

        // Standalone and dropdown
        $action = (new TestAntFusionActionTestAction)->standalone()->asDropdown();
        $this->assertTrue($action->isStandalone());
        $this->assertTrue($action->isDropdown());
        $this->assertEquals('action-dropdown-link', $this->invokeMethod($action, 'getComponent'));
    }

    public function testGetComponentForActionWithAction()
    {
        $action = new TestAntFusionActionTestActionWithFields;

        // Default case
        $this->assertFalse($action->isDropdown());
        $this->assertFalse($action->isStandalone());
        $this->assertEquals('action-button', $this->invokeMethod($action, 'getComponent'));
        
        // Standalone
        $action = (new TestAntFusionActionTestActionWithFields)->standalone();
        $this->assertTrue($action->isStandalone());
        $this->assertFalse($action->isDropdown());
        $this->assertEquals('action-button', $this->invokeMethod($action, 'getComponent'));

        // Dropdown
        $action = (new TestAntFusionActionTestActionWithFields)->asDropdown();
        $this->assertFalse($action->isStandalone());
        $this->assertTrue($action->isDropdown());
        $this->assertEquals('action-button', $this->invokeMethod($action, 'getComponent'));

        // Standalone and dropdown
        $action = (new TestAntFusionActionTestActionWithFields)->standalone()->asDropdown();
        $this->assertTrue($action->isStandalone());
        $this->assertTrue($action->isDropdown());
        $this->assertEquals('action-button', $this->invokeMethod($action, 'getComponent'));
    }

    public function testActionUrl() {
        $resource = new TestAntFusionActionTestResource;
        $array = $resource->createMeta();
        $url = $array['children'][0]['actions'][0]['url'];

        $this->assertTrue(strlen($url) > 0);
    }
}

class TestAntFusionActionTestAction extends Action
{
}

class TestAntFusionActionTestActionWithFields extends Action
{
    public function fields() {
        return [
            TestAntFusionActionTestField::make('Test', 'test'),
        ];
    }
    
}

class TestAntFusionActionTestField extends Field
{
    
}

class TestAntFusionActionTestField2 extends Field
{
    use \Addons\AntFusion\Traits\HasActions;
    
    public function toArray()
    {
        return array_merge(parent::toArray(), [
            'actions' => $this->actionsArray(),
        ]);
    }
    
    public function actions() {
        return [
            (new TestAntFusionActionTestAction)->standalone(),
        ];
    }

    public function getActionUrl($actionSlug) 
    {
        return $this->parent->getActionUrl($actionSlug);
    }
}

class TestAntFusionActionTestResource extends Resource
{
    public function fields() {
        return [
            TestAntFusionActionTestField2::make('Test', 'test'),
        ];
    }
}