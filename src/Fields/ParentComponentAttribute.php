<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;

class ParentComponentAttribute extends Field 
{
    protected $component = 'parent-value';

    public function setAttribute($attribute) {
        return $this->withMeta(['attribute' => $attribute]);
    }
}