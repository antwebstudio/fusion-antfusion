<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Addons\AntFusion\Resource;
use Illuminate\Support\Str;
use Addons\AntFusion\Fields\Select;
use Addons\AntFusion\Components\SimpleWizard;
use Addons\AntFusion\Components\Table;

class TableTest extends TestCase
{
    public function testGetComponentByPath()
    {
        $resource = new TableTestResource;
        $array = $resource->createMeta();
        $path = $array['fields'][0]['path'];
        $path2 = $array['children'][0]['children'][0]['path'];
        $resource = new TableTestResource;
        
        $component = $resource->getComponentByPath(Str::after($path, '.'));
        $component2 = $resource->getComponentByPath(Str::after($path2, '.'));
        
        $this->assertEquals(Select::class, get_class($component));
        $this->assertEquals(Select::class, get_class($component2));
    }
    
    public function testGetComponentByPath2()
    {
        $resource = new TableTestResource2;
        $array = $resource->createMeta();
        $path = $array['fields'][0]['path'];
        $path2 = $array['children'][0]['steps'][0]['children'][0]['children'][0]['path'];
        $resource = new TableTestResource2;
        
        $component = $resource->getComponentByPath(Str::after($path, '.'));
        $component2 = $resource->getComponentByPath(Str::after($path2, '.'));
        
        $this->assertEquals(Select::class, get_class($component));
        $this->assertEquals(Select::class, get_class($component2));
    }
}

class TableTestResource extends Resource
{
    public function fields() {
        return [
            Table::make()->addRows(
                [
                    Select::make('Customer', 'customer')->options([]),
                ],
            ),
        ];
    }
}

class TableTestResource2 extends Resource
{
    public function fields() {
        return [
            SimpleWizard::make()->steps([
                [
                    Table::make()->addRows(
                        [
                            Select::make('Customer', 'customer')->options([]),
                        ],
                    ),
                ],
            ]),
        ];
    }
}