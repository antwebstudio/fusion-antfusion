<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Contracts\Panel;

class NestedComponent extends \Addons\AntFusion\Component implements Panel {
    use \Addons\AntFusion\Traits\HasFields;

    protected $children = [];

    public function __construct($component) {
        $this->component = $component;
    }

    public function setChildren($children) {
        $this->children = $children;
        return $this;
    }

    public function toArray() {
        return [
            'is_panel' => true,
            'component' => 'nested-component',
            'debug' => true,
            'as' => $this->component,
            'children' => $this->convertFieldsToArray($this->children),
            'fields' => $this->flatternFieldsArray(),
            'path' => $this->getPath(),
        ];
    }
}