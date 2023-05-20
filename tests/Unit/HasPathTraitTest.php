<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Addons\AntFusion\Page;
use Addons\AntFusion\Field;
use Illuminate\Support\Str;
use Addons\AntFusion\Action;
use Addons\AntFusion\Resource;
use Addons\AntFusion\Traits\HasPath;
use Addons\AntFusion\Components\Panel;
use Addons\AntFusion\Traits\HasParent;

class HasPathTraitTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testGetPath()
    {
        $component = new TestComponent('test');
        $this->assertEquals('test', $component->getPath());

        $parentComponent = new TestComponent('parent-test');
        $component->setParent($parentComponent);

        $this->assertEquals('parent-test.test', $component->getPath());
    }

    public function testGetComponentByPathForResource()
    {
        $resource = new HasPathTestResource;

        $array = $resource->toArray();
        $path = $array['actions'][0]['path'];

        $resource = new HasPathTestResource;
        $action = $resource->getComponentByPath(Str::after($path, '.'));
        
        $this->assertEquals(HasPathTestTestAction::class, get_class($action));
    }

    public function testGetComponentByPathForResource2()
    {
        $resource = new HasPathTestResourceWithFields;

        $array = $resource->createMeta();
        $path = $array['fields'][0]['actions'][0]['path'];

        $resource = new HasPathTestResourceWithFields;
        $action = $resource->getComponentByPath(Str::after($path, '.'));
        
        $this->assertEquals(HasPathTestTestAction::class, get_class($action));
    }

    public function testGetComponentByPathForResource3()
    {
        $resource = new HasPathTestResourceWithPanelAndFields;

        $array = $resource->createMeta();
        $path = $array['fields'][0]['actions'][0]['path'];

        $resource = new HasPathTestResourceWithPanelAndFields;
        $action = $resource->getComponentByPath(Str::after($path, '.'));
        
        $this->assertEquals(HasPathTestTestAction::class, get_class($action));
    }

    public function testGetComponentByPathForResource4()
    {
        $resource = new HasPathTestResourceWithTwoPanelAndFields;

        $array = $resource->createMeta();
        $path = $array['fields'][0]['actions'][0]['path'];

        $resource = new HasPathTestResourceWithTwoPanelAndFields;
        $action = $resource->getComponentByPath(Str::after($path, '.'));
        
        $this->assertEquals(HasPathTestTestAction::class, get_class($action));
    }

    public function testGetComponentByPathForResource5()
    {
        $resource = new HasPathTestResourceWithFieldsAndActions;

        $array = $resource->toArray();
        
        $path = $array['actions'][0]['path'];
        $fieldPath = $array['fields'][0]['path'];

        $resource = new HasPathTestResourceWithFieldsAndActions;
        $action = $resource->getComponentByPath(Str::after($path, '.'));
        
        $this->assertEquals(HasPathTestSameNameAction::class, get_class($action));

        $action = $resource->getComponentByPath(Str::after($fieldPath, '.'));
        
        $this->assertEquals(HasPathTestSameNameField::class, get_class($action));
    }
}

class TestComponent {
    use HasPath;
    use HasParent;

    public function __construct($slug)
    {
        $this->slug = $slug;   
    }

    public function getSlug() {
        return $this->slug;
    }
}

class HasPathTestResource extends Resource
{
    public function actions() {
        return [
            new HasPathTestTestAction,
        ];
    }
}

class HasPathTestResourceWithFields extends Resource
{
    public function fields() {
        return [
            HasPathTestField::make('Test Field', 'test_field'),
        ];
    }
}

class HasPathTestResourceWithPanelAndFields extends Resource
{
    public function fields() {
        return [
            Panel::make('', [
                HasPathTestField::make('Test Field', 'test_field'),
            ]),
        ];
    }
}

class HasPathTestResourceWithTwoPanelAndFields extends Resource
{
    public function fields() {
        return [
            Panel::make('', [
                HasPathTestField::make('Test Field', 'test_field'),
            ]),

            Panel::make('', [
            ]),
        ];
    }
}

class HasPathTestResourceWithFieldsAndActions extends Resource
{
    public function fields() {
        return [
            HasPathTestSameNameField::make('Test Field', 'test_field'),
        ];
    }

    public function actions() {
        return [
            (new HasPathTestSameNameAction)->standalone(),
        ];
    }

    public function toArray() {
        return [
            'actions' => $this->actionsArray(),
            'fields' => $this->flatternFieldsArray(),
        ];
    }
}

class HasPathTestSameNameAction extends Action {
    public function getSlug() {
        return 'same_name';
    }
}

class HasPathTestSameNameField extends Field {
    public function getSlug() {
        return 'same_name';
    }
}

class HasPathTestTestAction extends Action
{
    protected $standalone = true;
}

class HasPathTestField extends Field
{
    use \Addons\AntFusion\Traits\HasActions;

    public function actions()
    {
        return [
            new HasPathTestTestAction,
        ];
    }

    public function toArray()
    {
        return array_merge(parent::toArray(), [
            'actions' => $this->actionsArray(),
        ]);
    }

    public function getActionUrl($actionSlug) 
    {
        return '';
    }
}