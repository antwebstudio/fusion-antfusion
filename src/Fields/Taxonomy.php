<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Fields\Fusion;
use Ant\FusionHelper\Helpers\Fusion as FusionHelper;

class Taxonomy extends Fusion 
{
    protected $fieldType = 'extended-taxonomy';
    protected $multiple = false;
    protected $taxonomyHandle;

    public function getSettings() {
        return array_merge(parent::getSettings(), [
            'taxonomy' => FusionHelper::getTaxonomyId($this->taxonomyHandle),
            'multiple' => $this->multiple,
        ]);
    }

    public function setTaxonomy($taxonomyHandle) {
        $this->taxonomyHandle = $taxonomyHandle;
        return $this;
    }

    public function multiple($multiple = true) {
        $this->multiple = $multiple;
        return $this;
    }
}