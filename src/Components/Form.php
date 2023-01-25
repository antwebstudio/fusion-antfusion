<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;

class Form extends Component {
    use \Addons\AntFusion\Traits\HasFields;
    
    protected $component = 'antfusion-form';

    public function toArray() {
        return [
            'component' => $this->component,
            'actions' => $this->actionsArray(),
            'fields' => $this->fieldsArray(),
        ];
    }
}