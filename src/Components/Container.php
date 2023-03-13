<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;

class Container extends Component
{
    protected $component = 'component-container';

    protected $children;

    public function __construct($components) {
        $this->withMeta(['class' => 'flex flex-wrap']);

        $this->children = $components;
    }

    public function components()
    {
        return $this->children;
    }
}