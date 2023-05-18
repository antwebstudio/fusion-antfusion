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

    public function __construct($label, $fields, $slug = null)
    {
        $this->label = $label;
        $this->fields = $fields;
        if (isset($slug)) {
            $this->slug = $slug;
        }
        $this->width('100%');
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

        return array_merge($this->meta, [
            'id' => $this->id ?? $this->getHandle(),
            'is_panel' => true,
            'component' => 'nested-component',
            'as' => $this->component,
            'children' => $children,
            'fields' => $this->flatternFieldsArray(),
        ]);
    }

    public function fields() {
        return $this->fields;
    }

    public function withLeftPadding($padding = '2', $breakpoint = 'md') {
        return $this->withClass($breakpoint.':pl-'.$padding);
    }

    public function withRightPadding($padding = '2', $breakpoint = 'md') {
        return $this->withClass($breakpoint.':pr-'.$padding);
    }
    
    public function withHorizontalPadding($padding = '2', $breakpoint = 'md') {
        return $this->withClass($breakpoint.':px-'.$padding);
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

    public static function parseWidthPercentage($value) {
        $value = str_replace(' ', '', $value);
        if (preg_match('/^\d+\/\d+$/i', $value)) {
            $value = explode('/', $value);
            $value = $value[0] / $value[1] * 100;
        } else if (Str::contains($value, '%')) {
            return $value;
        }

        return $value.'%';
    }
}