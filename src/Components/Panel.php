<?php
namespace Addons\AntFusion\Components;

use JsonSerializable;
use Illuminate\Support\Str;
use Addons\AntFusion\Component;
use Addons\AntFusion\Contracts\Panel as PanelInterface;

class Panel extends Component implements PanelInterface, JsonSerializable {
    use \Addons\AntFusion\Traits\HasFields;
    
    protected $component = 'antfusion-panel';

    protected $label;

    protected $fields;

    protected $scenario;

    public function __construct($label, $fields)
    {
        $this->label = $label;
        $this->fields = $fields;
    }

    public function fields() {
        return $this->fields;
    }

    public function jsonSerialize() {
        return $this->toArray();
    }

    public function toArray() {
        // if (!isset($this->scenario)) {
        //     $array = [];
        //     foreach ($this->fields as $field) {
        //         $array[] = $field->toArray();
        //     }
        //     return $array;
        // } else {
            return [
                'component' => $this->component,
                'label' => $this->label,
                'children' => $this->fieldsArray($this->scenario),
                'is_panel' => true,
                'fields' => $this->flatternFieldsArray($this->scenario),
            ];
        // }
    }

    public function shouldShowIn($scenario) {
        return true;
    }
}