<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;
use Addons\AntFusion\Contracts\Panel;

/***
Example usage:
    Tabs::make()
        ->addTab('Tab', [
            new \App\AntFusion\Reports\Report1,
        ])
        ->addTab('Tab 2', [
            new \App\AntFusion\Reports\Report2,
        ])
 */
class Tabs extends Component implements Panel {
    use \Addons\AntFusion\Traits\HasFields;

    protected $tabs = [];

    protected $component = 'ui-tabs';

    protected $tabComponent = 'ui-tab';

    public function toArray() {
        $children = [];
        foreach ($this->tabs as $name => $tab) {
            $grandchildren = [];
            foreach ($tab as $component) {
                $grandchildren[] = $component->toArray();
            }
            $children[] = [
                'component' => $this->tabComponent,
                'name' => $name,
                'children' => $grandchildren,
            ];
        }

        return [
            'is_panel' => true,
            'component' => 'nested-component',
            'as' => $this->component,
            'children' => $children,
            'fields' => $this->flatternFieldsArray(),
        ];
    }

    public function addTab($name, $components) {
        $this->tabs[$name] = $components;
        return $this;
    }

    public function fields() {
        $fields = [];
        foreach ($this->tabs as $components) {
            $fields = array_merge($fields, $components);
        }
        return $fields;
    }
}