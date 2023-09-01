<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;
use Addons\AntFusion\Fields\Fusion;
use Addons\AntFusion\Contracts\Panel;

class TableCell extends Component implements Panel {
    use \Addons\AntFusion\Traits\HasFields;
    // use \Addons\AntFusion\Traits\Container;

    protected $component = 'antfusion-html-table-cell';
    protected $children = [];

    public function __construct($children)
    {
        $this->children = is_array($children) ? $children : [$children];
    }

    public static function wrap($children) {
        return static::make($children);
    }
    
    public function toArray() {
        return array_merge($this->meta, [
            'is_panel' => true,
            'component' => $this->component,
            'children' => $this->convertFieldsToArray($this->children),
            'fields' => $this->flatternFieldsArray(),
            'path' => $this->getPath(),
        ]);
    }

    public function fields() {
        return $this->children;
    }
}