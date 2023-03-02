<?php
namespace Addons\AntFusion\Components;

use JsonSerializable;
use Illuminate\Support\Str;
use Addons\AntFusion\Component;
use Addons\AntFusion\Contracts\Panel as PanelInterface;

class Panel extends Component implements PanelInterface {
    use \Addons\AntFusion\Traits\HasFields;

    protected $label = '';

    protected $fields = [];

    protected $component = 'ui-card';

    protected $childComponent = 'panel-body';
    

    public function __construct($label, $fields)
    {
        $this->label = $label;
        $this->fields = $fields;
    }

    public function toArray() {
        $children = [];
        // foreach ($this->fields as $name => $tab) {
            $grandchildren = [];
            foreach ($this->fields as $component) {
                $grandchildren[] = $component->setParent($this)->toArray();
            }
            $children[] = [
                'component' => $this->childComponent,
                // 'name' => $name,
                'label' => $this->label,
                'children' => $grandchildren,
            ];
        // }

        return [
            'is_panel' => true,
            'component' => 'nested-component',
            'debug' => false,
            'as' => $this->component,
            'children' => $children,
            'fields' => $children,
        ];
    }

    public function fields() {
        return $this->fields;
    }
}