<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;
use Addons\AntFusion\Fields\Fusion;

class ResourceField extends Fusion {
    protected $fieldType = 'resource';
    protected $multiple = false;

    protected $resourceHandle;

    public function getSettings() {
        return array_merge(parent::getSettings(), [
            'resource' => $this->resourceHandle,
            'multiple' => $this->multiple,
        ]);
    }

    public function setResource($resourceHandle) {
        $this->resourceHandle = $resourceHandle;
        return $this;
    }

    public function multiple($multiple = true) {
        $this->multiple = $multiple;
        return $this;
    }
}