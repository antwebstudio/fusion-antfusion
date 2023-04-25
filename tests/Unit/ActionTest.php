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