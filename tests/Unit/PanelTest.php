<?php

namespace Tests\Unit\AntFusion;

use Addons\AntFusion\Component;
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

        $array = $panel->toArray();
        $path = $array['fields'][0]['path'];
       
        $component = $panel->getComponentByPath(Str::after($path, '.'));
        
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

        $array = $panel->toArray();

        $path = $array['fields'][0]['path'];
        
        $component = $panel->getComponentByPath(Str::after($path, '.'));

        $this->assertEquals(PanelTestTestComponent::class, get_class($component));
    }
}

class PanelTestTestComponent extends Component {
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
        return [
            'path' => $this->getPath(),
        ];
    }
}