<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;
use Addons\AntFusion\Contracts\Panel as PanelContract;

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
class Tabs extends Component implements PanelContract {
    use \Addons\AntFusion\Traits\HasFields;
    use \Addons\AntFusion\Traits\HasScenario;

    protected $tabs = [];

    protected $component = 'ui-tabs';

    protected $tabComponent = 'ui-tab';

    public function __construct(... $arguments)
    {
        $this->width('100%');
    }

    public function toArray() {
        $children = [];
        $isFirst = true;
        foreach ($this->tabs as $name => $tab) {
            $grandchildren = [];
            foreach ($tab as $component) {
                $grandchildren[] = $component->setScenario($this->scenario)->toArray();
            }
            $children[] = [
                'component' => $this->tabComponent,
                'hide' => ! $isFirst,
                'name' => __($name),
                'children' => $grandchildren,
            ];
            $isFirst = false;
        }

        return array_merge($this->meta, [
            'is_panel' => true,
            'component' => 'nested-component',
            'as' => $this->component,
            'children' => $children,
            'fields' => $this->flatternFieldsArray($this->scenario),
        ]);
    }

    public function addTab($name, $components) {
        $this->tabs[$name] = $components;
        return $this;
    }

    public function mergeTab($name, $components) {
        $this->tabs[$name] = array_merge($this->tabs[$name] ?? [], $components);
        return $this;
    }

    public function addDynamicTabs($callback) {
        call_user_func_array($callback, [$this]);
        return $this;
    }

    public function fields() {
        $fields = [];
        foreach ($this->tabs as $components) {
            $fields = array_merge($fields, $components);
        }
        return $fields;
    }
    
    protected function withStyle($style = []) {
        return $this->withMeta([
            'style' => array_merge($this->meta['style'] ?? [], $style),
        ]);
    }

    protected function withClass($className) {
        $class = $this->meta['class'] ?? [];
        $class = is_array($class) ? $class : [$class];
        return $this->withMeta([
            'class' => array_merge($class, [$className]),
        ]);
    }

    public function width($width, $breakpoint = 'md') {
        if ($width == '100%') {
            return $this->withClass('w-full');
        } else if (preg_match('/^\d+\/\d+$/i', $width)) {
            return $this->withClass($breakpoint.':w-'.$width);
        } else {
            throw new \Exception('Invalid width: '.$width);
        }
    }
}