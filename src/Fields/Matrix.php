<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Fields\Fusion;
use Ant\FusionHelper\Helpers\Fusion as FusionHelper;

class Matrix extends Fusion 
{
    protected $fieldType = 'extended-matrix';
    protected $multiple = false;
    protected $matrixHandle;

    public function getSettings() {
        return array_merge(parent::getSettings(), [
            'matrix' => FusionHelper::getMatrixId($this->matrixHandle),
            'multiple' => $this->multiple,
        ]);
    }

    public function setMatrix($matrixHandle) {
        $this->matrixHandle = $matrixHandle;
        return $this;
    }

    public function multiple($multiple = true) {
        $this->multiple = $multiple;
        return $this;
    }
}