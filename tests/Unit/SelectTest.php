<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Addons\AntFusion\Resource;
use Illuminate\Support\Str;
use Addons\AntFusion\Action;
use Addons\AntFusion\Fields\Select;
use Addons\AntFusion\Components\Panel;

class SelectTest extends TestCase
{
    public function testGetComponentByPath()
    {
        $resource = new SelectTestResource;
        $array = $resource->createMeta();
        $path = $array['fields'][0]['actions'][0]['path'];

        $resource = new SelectTestResource;
        
        $action = $resource->getComponentByPath(Str::after($path, '.'));
        
        $this->assertEquals(\Addons\AntFusion\Actions\Create::class, get_class($action));
    }
}

class SelectTestResource extends Resource
{
    public function fields() {
        return [
            Panel::make('', [
                Select::make('Customer', 'customer')
                    ->addAction(new \Addons\AntFusion\Actions\Create)
                    ->options([]),
            ])->width('1/2')->withRightPadding(),
        ];
    }
}