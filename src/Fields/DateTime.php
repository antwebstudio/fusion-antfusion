<?php
namespace Addons\AntFusion\Fields;

use Addons\AntFusion\Field;

class DateTime extends Fusion
{
    protected $fieldType = 'date';

    public function __construct($label, $handle) {
        parent::__construct($label, $handle);
        
        $this->mergeSettings([
            'format' => 'Y-m-d',
        ]);
    }
}