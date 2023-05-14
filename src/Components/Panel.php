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

    public function withLeftPadding($padding = '0.5rem') {
        return $this->withStyle([
            'padding-left' => $padding,
        ]);
    }

    public function withRightPadding($padding = '0.5rem') {
        return $this->withStyle([
            'padding-right' => $padding,
        ]);
    }
    
    protected function withStyle($style = []) {
        return $this->withMeta([
            'style' => array_merge($this->meta['style'] ?? [], $style),
        ]);
    }

    public function width($width) {
        return $this->withStyle([
            'width' => static::parseWidthPercentage($width),
        ]);
    }

    public static function parseWidthPercentage($value) {
        $value = str_replace(' ', '', $value);
        if (preg_match('/^\d+\/\d+$/i', $value)) {
            $value = explode('/', $value);
            $value = $value[0] / $value[1] * 100;
        }

        return $value.'%';
    }
}