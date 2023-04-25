<?php
namespace Addons\AntFusion\Components;

use Addons\AntFusion\Action;

class Divider extends Action {
    protected $dropdown = true;
    
    public function __construct() {
        $this->onlyInline();
    }

    public function toArrayForDetail($record) {
        return [
            'component' => 'ui-dropdown-divider',
        ];
    }
}