<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Component;

class Form extends Component {
    use \Addons\AntFusion\Traits\HasFields;
    
    protected $component = 'antfusion-form';

    public function toArray() {
        return array_merge($this->meta, [
            'component' => $this->component,
            'actions' => $this->actionsArray(),
            'fields' => $this->flatternFieldsArray(),
            'children' => $this->fieldsArray(),
            'syncDependantFieldUrl' => $this->getSyncDependantFieldUrl(),
        ]);
    }

    protected function getSyncDependantFieldUrl() {
        return route('antfusion.page.sync_fields', ['page' => $this->getRoot()->getSlug()]);
    }
}