<?php

namespace Tests\Unit\AntFusion;

use Tests\TestCase;
use Illuminate\Support\Str;
use Addons\AntFusion\Traits\HasPath;
use Addons\AntFusion\Components\Panel;
use Addons\AntFusion\Traits\HasParent;

class PanelTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testGetComponentByPath()
    {
        $panel = Panel::make('', [
            new PanelTestTestComponent('test'),
        ]);

        $component = $panel->getComponentByPath('test');
        
        $this->assertEquals('test', $component->getSlug());
    }
    
    public function testGetComponentByPathForNestedComponent()
    {
        $component = new PanelTestTestComponent('test');

        $panel = Panel::make('', [
            Panel::make('', [
                $component,
            ]),
        ]);

        $panel->toArray();

        $this->assertEquals($component->getPath(), $panel->getComponentByPath(Str::after($component->getPath(), '.'))->getPath());
    }
}

class PanelTestTestComponent {
    use HasPath;
    use HasParent;

    public function __construct($slug)
    {
        $this->slug = $slug;   
    }

    public function getSlug() {
        return $this->slug;
    }

    public function toArray() {
        
    }
}