<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Addons\AntFusion\Resource;
use Illuminate\Support\Str;
use Addons\AntFusion\Fields\Select;
use Addons\AntFusion\Components\SimpleWizard;

class SimpleWizardTest extends TestCase
{
    public function testChildrenCount()
    {
        $resource = new SimpleWizardTestResource;
        $array = $resource->createMeta();

        $this->assertEquals(1, count($array['children'][0]['steps'][0]['children']));
        $this->assertEquals(1, count($array['children'][0]['steps'][1]['children']));
        $this->assertEquals(1, count($array['children']));

    }

    public function testGetComponentByPath()
    {
        $resource = new SimpleWizardTestResource;
        $array = $resource->createMeta();
        $path = $array['fields'][0]['path'];
        $path2 = $array['children'][0]['steps'][0]['children'][0]['path'];
        $path3 = $array['children'][0]['steps'][1]['children'][0]['path'];

        $resource = new SimpleWizardTestResource;
        
        $component = $resource->getComponentByPath(Str::after($path, '.'));
        $component2 = $resource->getComponentByPath(Str::after($path2, '.'));
        $component3 = $resource->getComponentByPath(Str::after($path3, '.'));
        
        $this->assertEquals(Select::class, get_class($component));
        $this->assertEquals(Select::class, get_class($component2));
        $this->assertEquals(Select::class, get_class($component3));
    }
}

class SimpleWizardTestResource extends Resource
{
    public function fields() {
        return [
            SimpleWizard::make()->steps([
                [
                    Select::make('Customer', 'customer')->options([]),
                ],
                [
                    Select::make('Vendor', 'vendor')->options([]),
                ],
            ]),
        ];
    }
}