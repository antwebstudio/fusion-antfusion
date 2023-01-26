<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;

class ID extends Field 
{
    public function __construct($label = null, $handle = null) {
        $this->label = $label ?? 'ID';
        $this->handle = $handle ?? 'id';
    }
}